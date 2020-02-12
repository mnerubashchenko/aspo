import { Component, enableProdMode, ViewChild, Inject } from '@angular/core';
import { IProjectProtocol, ProjectProtocolService } from '../table-project-protocol/ProjectProtocolService';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import CustomStore from "devextreme/data/custom_store";
import { DxDataGridComponent } from 'devextreme-angular';
import { IProject, ProjectService } from '../table-projects/ProjectService';
import { IProtocol, ProtocolService } from '../table-protocol/ProtocolService';

@Component({
    selector: 'app-table-project-protocol',
    templateUrl: './table-project-protocol.component.html',
    styleUrls: ['./table-project-protocol.component.css']
})
export class TableProjectProtocolComponent {
    public links: IProjectProtocol[];
    public projects: IProject[];
    public protocols: IProtocol[];
    @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;
    store: any;
    headers: HttpHeaders;
    constructor(private projectProtocolService: ProjectProtocolService, private projectService: ProjectService, private protocolService: ProtocolService,
        public http: HttpClient, @Inject('BASE_URL') public baseUrl: string) {
        sessionStorage.setItem("locale", 'ru');

        this.projectProtocolService.subject.subscribe(this.projectProtocolReceived);
        this.projectProtocolService.getProjProtLinks();

        this.projectService.subject.subscribe(this.projectReceived);
        this.projectService.getProjects();

        this.protocolService.subject.subscribe(this.protocolReceived);
        this.protocolService.getProtocols();

        this.baseUrl = baseUrl;
        this.headers = new HttpHeaders().set('content-type', 'application/json');
        setTimeout(() => {
            this.store = new CustomStore({
                key: "idProjprot",
                load: () => this.links,
                insert: (values) => this.http.post<any>(this.baseUrl + 'ProjectProtocol/CreateProjProtLink', JSON.stringify(values as IProjectProtocol), { headers: this.headers }).subscribe(
                    () => { this.projectProtocolService.getProjProtLinks(); }),
                update: (key, values) =>
                    this.http.put<any>(this.baseUrl + 'ProjectProtocol/UpdateProjProtLink', JSON.stringify(values as IProjectProtocol), { headers: this.headers }).subscribe(
                        () => { this.projectProtocolService.getProjProtLinks(); }),
                remove: (key) => this.http.delete<any>(this.baseUrl + 'ProjectProtocol/'+key, {}).subscribe(() => { this.projectProtocolService.getProjProtLinks(); })
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

    projectProtocolReceived = (data: IProjectProtocol[]) => {
        this.links = data;
        this.dataGrid.instance.refresh();
    }

    projectReceived = (data1: IProject[]) => {
        this.projects = data1;
        this.dataGrid.instance.refresh();
    }

    protocolReceived = (data2: IProtocol[]) => {
        this.protocols = data2;
        this.dataGrid.instance.refresh();
    }

    ngOnInit() {

    }

}
