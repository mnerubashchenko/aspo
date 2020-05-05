import { Component, OnInit, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { IProject, ProjectService } from '../table-projects/ProjectService';
import { IMeasure, MeasureService } from '../table-measures/MeasureService';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import notify from 'devextreme/ui/notify';

@Component({
  selector: 'app-project-creator',
  templateUrl: './project-creator.component.html',
  styleUrls: ['./project-creator.component.css'],
})
export class ProjectCreatorComponent implements OnInit {
  user: string;
  measures: string[];
  devices: string[];
  interfaces: string[];
  commands: string[];
  telemetries: string[];
  selectedMeasures: string[] = [];
  selectedDevices: string[] = [];
  selectedInterfaces: string[] = [];
  selectedCommands: string[] = [];
  selectedTelemetries: string[] = [];
  helper: number = 0;

  constructor(private http: HttpClient, @Inject('BASE_URL') public baseUrl: string, private router: Router) {

    this.user = localStorage.getItem("idOfUser");

    Observable.forkJoin(
      this.http.get<any>(this.baseUrl + 'Measure/GetNamesOfMeasures'),
      this.http.get<any>(this.baseUrl + 'Devices/GetNamesOfDevices'),
      this.http.get<any>(this.baseUrl + 'Interface/GetNamesOfInterfaces'),
      this.http.get<any>(this.baseUrl + 'ProgrammCommands/GetNamesOfCommands'),
      this.http.get<any>(this.baseUrl + 'Telemetry/GetNamesOfTelemetries')
    ).subscribe(([res1, res2, res3, res4, res5]) => {
      this.measures = res1;
      this.devices = res2;
      this.interfaces = res3;
      this.commands = res4;
      this.telemetries = res5;
    });

  }

  ngOnInit() {
  }

  public next() {
    this.helper++;
  }

  public back() {
    --this.helper;
  }

  public generateProject = (form: NgForm) => {
    this.http.post<any>(this.baseUrl + "Projects/CreateProject", JSON.stringify(form.value as IProject), {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    }).subscribe(res => {

      this.http.post<any>(this.baseUrl + "ProjectMeasure/CreateLinkFromAccount", this.selectedMeasures, {
        headers: new HttpHeaders({
          "Content-Type": "application/json"
        })
      }).subscribe();

      this.http.post<any>(this.baseUrl + "ProjectDevice/CreateLinkFromAccount", this.selectedDevices, {
        headers: new HttpHeaders({
          "Content-Type": "application/json"
        })
      }).subscribe();

      this.http.post<any>(this.baseUrl + "ProjectInterface/CreateLinkFromAccount", this.selectedInterfaces, {
        headers: new HttpHeaders({
          "Content-Type": "application/json"
        })
      }).subscribe();

      this.http.post<any>(this.baseUrl + "ProjectCommand/CreateLinkFromAccount", this.selectedCommands, {
        headers: new HttpHeaders({
          "Content-Type": "application/json"
        })
      }).subscribe();

      this.http.post<any>(this.baseUrl + "ProjectTelemetry/CreateLinkFromAccount", this.selectedTelemetries, {
        headers: new HttpHeaders({
          "Content-Type": "application/json"
        })
      }).subscribe();

      this.http.post<any>(this.baseUrl + "Comments/CreateComment", {
        headers: new HttpHeaders({
          "Content-Type": "application/json"
        })},
        {
          params: new HttpParams().set("nameProject", form.controls.nameProject.value)
            .set("authorProject", localStorage.getItem("idOfUser"))
            .set("bodyComment", "Создал проект.")
        }).subscribe();
      notify({
        message: "Проект создан", width: 300, shading: false,
        position: { my: 'top', at: 'top', of: window, offset: '0 10' },
        animation: {
          show: { duration: 300, type: "slide", from: { top: -50 } },
          hide: { duration: 300, type: "slide", to: { top: -50 } }
        }
      }, "success", 1000);
      this.helper = 0;
      form.controls.nameProject.setValue("");
      form.controls.descriptionProject.setValue("");
    },
      error => {
        if (error.error == "Проект с таким названием уже существует!") {
          notify({
            message: error.error, width: 300, shading: false,
            position: { my: 'top', at: 'top', of: window, offset: '0 10' },
            animation: {
              show: { duration: 300, type: "slide", from: { top: -50 } },
              hide: { duration: 300, type: "slide", to: { top: -50 } }
            }
          }, "error", 1000);
        }
        else {
          notify({
            message: error.error, width: 300, shading: false,
            position: { my: 'top', at: 'top', of: window, offset: '0 10' },
            animation: {
              show: { duration: 300, type: "slide", from: { top: -50 } },
              hide: { duration: 300, type: "slide", to: { top: -50 } }
            }
          }, "error", 1000);
        }
      });
  }  
}
