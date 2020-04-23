import { Component, OnInit, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { IProject, ProjectService } from '../table-projects/ProjectService';
import { IMeasure, MeasureService } from '../table-measures/MeasureService';
import { Observable } from 'rxjs';

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


  constructor(private http: HttpClient, @Inject('BASE_URL') public baseUrl: string) {

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

    });
  }  
}
