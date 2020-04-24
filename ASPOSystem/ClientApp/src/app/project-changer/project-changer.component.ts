import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { IProject } from '../table-projects/ProjectService';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-project-changer',
  templateUrl: './project-changer.component.html',
  styleUrls: ['./project-changer.component.css']
})
export class ProjectChangerComponent implements OnInit {
  projects: string;
  projectName: string;
  projectInfo: IProject = { Id: '', NameProject: '', DescriptionProject: '', DateCreateProject: new Date(), DirectorProject: '' };
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

  constructor(public http: HttpClient, @Inject('BASE_URL') public baseUrl: string) {
    this.http.get<any>(this.baseUrl + 'Projects/GetNamesOfProjects').subscribe(result => {
      this.projects = result as string;
    }, error => console.error(error));
  }

  public selectedTable(data) {

    this.projectName = data.selectedItem;

    Observable.forkJoin(
      this.http.get<any>(this.baseUrl + "Projects/GetOneProject", {
        params: new HttpParams().set("projectName", this.projectName)
      }),
      this.http.get<any>(this.baseUrl + 'Measure/GetNamesOfMeasures'),
      this.http.get<any>(this.baseUrl + "ProjectMeasure/GetLinksForOneProject", {
        params: new HttpParams().set("projectName", this.projectName)
      }),
      this.http.get<any>(this.baseUrl + 'Devices/GetNamesOfDevices'),
      this.http.get<any>(this.baseUrl + "ProjectDevice/GetLinksForOneProject", {
        params: new HttpParams().set("projectName", this.projectName)
      }),
      this.http.get<any>(this.baseUrl + 'Interface/GetNamesOfInterfaces'),
      this.http.get<any>(this.baseUrl + "ProjectInterface/GetLinksForOneProject", {
        params: new HttpParams().set("projectName", this.projectName)
      }),
      this.http.get<any>(this.baseUrl + 'ProgrammCommands/GetNamesOfCommands'),
      this.http.get<any>(this.baseUrl + "ProjectCommand/GetLinksForOneProject", {
        params: new HttpParams().set("projectName", this.projectName)
      }),
      this.http.get<any>(this.baseUrl + 'Telemetry/GetNamesOfTelemetries'),
      this.http.get<any>(this.baseUrl + "ProjectTelemetry/GetLinksForOneProject", {
        params: new HttpParams().set("projectName", this.projectName)
      })
    ).subscribe(([res1, res2, res3, res4, res5, res6, res7, res8, res9, res10, res11]) => {
      this.projectInfo = res1;
      this.measures = res2;
      this.selectedMeasures = res3;
      this.devices = res4;
      this.selectedDevices = res5;
      this.interfaces = res6;
      this.selectedInterfaces = res7;
      this.commands = res8;
      this.selectedCommands = res9;
      this.telemetries = res10;
      this.selectedTelemetries = res11;
    });
  }

  ngOnInit() {
  }

}
