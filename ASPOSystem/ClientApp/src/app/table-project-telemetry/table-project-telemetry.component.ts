import { Component, enableProdMode, ViewChild, Inject } from '@angular/core';
import { IProjectTelemetry, ProjectTelemetryService } from '../table-project-telemetry/ProjectTelemetryService';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import CustomStore from "devextreme/data/custom_store";
import { DxDataGridComponent } from 'devextreme-angular';
import { IProject, ProjectService } from '../table-projects/ProjectService';
import { ITelemetry, TelemetryService } from '../table-telemetry/TelemetryService';

@Component({
  selector: 'app-table-project-telemetry',
  templateUrl: './table-project-telemetry.component.html',
  styleUrls: ['./table-project-telemetry.component.css']
})
export class TableProjectTelemetryComponent {
  public links: IProjectTelemetry[];
  public projects: IProject[];
  public telemetries: ITelemetry[];
  @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;
  store: any;
  headers: HttpHeaders;
  constructor(private projectTelemetryService: ProjectTelemetryService, private projectService: ProjectService, private telemetryService: TelemetryService,
    public http: HttpClient, @Inject('BASE_URL') public baseUrl: string) {
    sessionStorage.setItem("locale", 'ru');

    this.projectTelemetryService.subject.subscribe(this.linksReceived);
    this.projectTelemetryService.getLinks();

    this.projectService.subject.subscribe(this.projectsReceived);
    this.projectService.getProjects();

    this.telemetryService.subject.subscribe(this.telemetryReceived);
    this.telemetryService.getTelemetry();

    this.baseUrl = baseUrl;
    this.headers = new HttpHeaders().set('content-type', 'application/json');
    setTimeout(() => {
      this.store = new CustomStore({
        key: "id",
        load: () => this.links,
        insert: (values) => this.http.post<any>(this.baseUrl + 'ProjectTelemetry/CreateLink', JSON.stringify(values as IProjectTelemetry), { headers: this.headers }).subscribe(
          () => { this.projectTelemetryService.getLinks(); }),
        update: (key, values) =>
          this.http.put<any>(this.baseUrl + 'ProjectTelemetry/UpdateLink', JSON.stringify(values as IProjectTelemetry), { headers: this.headers }).subscribe(
            () => { this.projectTelemetryService.getLinks(); }),
        remove: (key) => this.http.delete<any>(this.baseUrl + 'ProjectTelemetry/' + key, {}).subscribe(() => { this.projectTelemetryService.getLinks(); })
      });
    }, 1000);

  }

  onRowUpdating(e) {
    for (var property in e.oldData) {
      if (!e.newData.hasOwnProperty(property)) {
        e.newData[property] = e.oldData[property];
      }
    }
  }

  linksReceived = (data: IProjectTelemetry[]) => {
    this.links = data;
    this.dataGrid.instance.refresh();
  }

  projectsReceived = (data1: IProject[]) => {
    this.projects = data1;
    this.dataGrid.instance.refresh();
  }

  telemetryReceived = (data2: ITelemetry[]) => {
    this.telemetries = data2;
    this.dataGrid.instance.refresh();
  }

  ngOnInit() {

  }

}
