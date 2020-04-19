import { Component, enableProdMode, ViewChild, Inject } from '@angular/core';
import { IProjectDevice, ProjectDeviceService } from '../table-project-device/ProjectDeviceService';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import CustomStore from "devextreme/data/custom_store";
import { DxDataGridComponent } from 'devextreme-angular';
import { IProject, ProjectService } from '../table-projects/ProjectService';
import { IDevice, DevicesService } from '../table-devices/DevicesService';

@Component({
  selector: 'app-table-project-device',
  templateUrl: './table-project-device.component.html',
  styleUrls: ['./table-project-device.component.css']
})
export class TableProjectDeviceComponent {
  public links: IProjectDevice[];
  public projects: IProject[];
  public devices: IDevice[];
  @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;
  store: any;
  headers: HttpHeaders;
  constructor(private projectDeviceService: ProjectDeviceService, private projectService: ProjectService, private deviceService: DevicesService,
    public http: HttpClient, @Inject('BASE_URL') public baseUrl: string) {
    sessionStorage.setItem("locale", 'ru');

    this.projectDeviceService.subject.subscribe(this.linksReceived);
    this.projectDeviceService.getLinks();

    this.projectService.subject.subscribe(this.projectReceived);
    this.projectService.getProjects();

    this.deviceService.subject.subscribe(this.deviceReceived);
    this.deviceService.getDevices();

    this.baseUrl = baseUrl;
    this.headers = new HttpHeaders().set('content-type', 'application/json');
    setTimeout(() => {
      this.store = new CustomStore({
        key: "id",
        load: () => this.links,
        insert: (values) => this.http.post<any>(this.baseUrl + 'ProjectDevice/CreateLink', JSON.stringify(values as IProjectDevice), { headers: this.headers }).subscribe(
          () => { this.projectDeviceService.getLinks(); }),
        update: (key, values) =>
          this.http.put<any>(this.baseUrl + 'ProjectDevice/UpdateLink', JSON.stringify(values as IProjectDevice), { headers: this.headers }).subscribe(
            () => { this.projectDeviceService.getLinks(); }),
        remove: (key) => this.http.delete<any>(this.baseUrl + 'ProjectDevice/' + key, {}).subscribe(() => { this.projectDeviceService.getLinks(); })
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

  linksReceived = (data: IProjectDevice[]) => {
    this.links = data;
    this.dataGrid.instance.refresh();
  }

  projectReceived = (data1: IProject[]) => {
    this.projects = data1;
    this.dataGrid.instance.refresh();
  }

  deviceReceived = (data2: IDevice[]) => {
    this.devices = data2;
    this.dataGrid.instance.refresh();
  }

  ngOnInit() {

  }

}
