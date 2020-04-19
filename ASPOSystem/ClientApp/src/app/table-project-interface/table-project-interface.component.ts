import { Component, enableProdMode, ViewChild, Inject } from '@angular/core';
import { IProjectInterface, ProjectInterfaceService } from '../table-project-interface/ProjectInterfaceService';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import CustomStore from "devextreme/data/custom_store";
import { DxDataGridComponent } from 'devextreme-angular';
import { IProject, ProjectService } from '../table-projects/ProjectService';
import { IInterface, InterfaceService } from '../table-interfaces/InterfaceService';

@Component({
  selector: 'app-table-project-interface',
  templateUrl: './table-project-interface.component.html',
  styleUrls: ['./table-project-interface.component.css']
})
export class TableProjectInterfaceComponent {
  public links: IProjectInterface[];
  public projects: IProject[];
  public interfaces: IInterface[];
  @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;
  store: any;
  headers: HttpHeaders;
  constructor(private projectInterfaceService: ProjectInterfaceService, private projectService: ProjectService, private interfaceService: InterfaceService,
    public http: HttpClient, @Inject('BASE_URL') public baseUrl: string) {
    sessionStorage.setItem("locale", 'ru');

    this.projectInterfaceService.subject.subscribe(this.linksReceived);
    this.projectInterfaceService.getLinks();

    this.projectService.subject.subscribe(this.projectReceived);
    this.projectService.getProjects();

    this.interfaceService.subject.subscribe(this.interfaceReceived);
    this.interfaceService.getInterfaces();

    this.baseUrl = baseUrl;
    this.headers = new HttpHeaders().set('content-type', 'application/json');
    setTimeout(() => {
      this.store = new CustomStore({
        key: "id",
        load: () => this.links,
        insert: (values) => this.http.post<any>(this.baseUrl + 'ProjectInterface/CreateLink', JSON.stringify(values as IProjectInterface), { headers: this.headers }).subscribe(
          () => { this.projectInterfaceService.getLinks(); }),
        update: (key, values) =>
          this.http.put<any>(this.baseUrl + 'ProjectInterface/UpdateLink', JSON.stringify(values as IProjectInterface), { headers: this.headers }).subscribe(
            () => { this.projectInterfaceService.getLinks(); }),
        remove: (key) => this.http.delete<any>(this.baseUrl + 'ProjectInterface/' + key, {}).subscribe(() => { this.projectInterfaceService.getLinks(); })
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

  linksReceived = (data: IProjectInterface[]) => {
    this.links = data;
    this.dataGrid.instance.refresh();
  }

  projectReceived = (data1: IProject[]) => {
    this.projects = data1;
    this.dataGrid.instance.refresh();
  }

  interfaceReceived = (data2: IInterface[]) => {
    this.interfaces = data2;
    this.dataGrid.instance.refresh();
  }

  ngOnInit() {

  }

}
