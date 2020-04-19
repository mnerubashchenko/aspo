import { Component, enableProdMode, ViewChild, Inject } from '@angular/core';
import { IProjectCommand, ProjectCommandService } from '../table-project-command/ProjectCommandService';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import CustomStore from "devextreme/data/custom_store";
import { DxDataGridComponent } from 'devextreme-angular';
import { IProject, ProjectService } from '../table-projects/ProjectService';
import { IProgrammcommands, PrCommandsService } from '../table-programm-commands/PrCommandsService';

@Component({
  selector: 'app-table-project-command',
  templateUrl: './table-project-command.component.html',
  styleUrls: ['./table-project-command.component.css']
})
export class TableProjectCommandComponent {
  public links: IProjectCommand[];
  public projects: IProject[];
  public commands: IProgrammcommands[];
  @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;
  store: any;
  headers: HttpHeaders;
  constructor(private projectCommandService: ProjectCommandService, private projectService: ProjectService, private commandService: PrCommandsService,
    public http: HttpClient, @Inject('BASE_URL') public baseUrl: string) {
    sessionStorage.setItem("locale", 'ru');

    this.projectCommandService.subject.subscribe(this.linksReceived);
    this.projectCommandService.getLinks();

    this.projectService.subject.subscribe(this.projectsReceived);
    this.projectService.getProjects();

    this.commandService.subject.subscribe(this.commandReceived);
    this.commandService.getCommand();

    this.baseUrl = baseUrl;
    this.headers = new HttpHeaders().set('content-type', 'application/json');
    setTimeout(() => {
      this.store = new CustomStore({
        key: "id",
        load: () => this.links,
        insert: (values) => this.http.post<any>(this.baseUrl + 'ProjectCommand/CreateLink', JSON.stringify(values as IProjectCommand), { headers: this.headers }).subscribe(
          () => { this.projectCommandService.getLinks(); }),
        update: (key, values) =>
          this.http.put<any>(this.baseUrl + 'ProjectCommand/UpdateLink', JSON.stringify(values as IProjectCommand), { headers: this.headers }).subscribe(
            () => { this.projectCommandService.getLinks(); }),
        remove: (key) => this.http.delete<any>(this.baseUrl + 'ProjectCommand/' + key, {}).subscribe(() => { this.projectCommandService.getLinks(); })
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

  linksReceived = (data: IProjectCommand[]) => {
    this.links = data;
    this.dataGrid.instance.refresh();
  }

  projectsReceived = (data1: IProject[]) => {
    this.projects = data1;
    this.dataGrid.instance.refresh();
  }

  commandReceived = (data2: IProgrammcommands[]) => {
    this.commands = data2;
    this.dataGrid.instance.refresh();
  }

  ngOnInit() {

  }
}
