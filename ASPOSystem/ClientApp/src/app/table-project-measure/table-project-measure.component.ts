import { Component, enableProdMode, ViewChild, Inject } from '@angular/core';
import { IProjectMeasure, ProjectMeasureService } from '../table-project-measure/ProjectMeasureService';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import CustomStore from "devextreme/data/custom_store";
import { DxDataGridComponent } from 'devextreme-angular';
import { IProject, ProjectService } from '../table-projects/ProjectService';
import { IMeasure, MeasureService } from '../table-measures/MeasureService';

@Component({
    selector: 'app-table-project-measure',
    templateUrl: './table-project-measure.component.html',
    styleUrls: ['./table-project-measure.component.css']
})
export class TableProjectMeasureComponent {
    public links: IProjectMeasure[];
    public projects: IProject[];
    public measures: IMeasure[];
    @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;
    store: any;
    headers: HttpHeaders;
    constructor(private projectMeasureService: ProjectMeasureService, private projectService: ProjectService, private measureService: MeasureService,
        public http: HttpClient, @Inject('BASE_URL') public baseUrl: string) {
        sessionStorage.setItem("locale", 'ru');

        this.projectMeasureService.subject.subscribe(this.linksReceived);
        this.projectMeasureService.getLinks();

        this.projectService.subject.subscribe(this.projectsReceived);
        this.projectService.getProjects();

        this.measureService.subject.subscribe(this.measureReceived);
        this.measureService.getMeasures();

        this.baseUrl = baseUrl;
        this.headers = new HttpHeaders().set('content-type', 'application/json');
        setTimeout(() => {
            this.store = new CustomStore({
                key: "id",
                load: () => this.links,
                insert: (values) => this.http.post<any>(this.baseUrl + 'ProjectMeasure/CreateLink', JSON.stringify(values as IProjectMeasure), { headers: this.headers }).subscribe(
                    () => { this.projectMeasureService.getLinks(); }),
                update: (key, values) =>
                    this.http.put<any>(this.baseUrl + 'ProjectMeasure/UpdateLink', JSON.stringify(values as IProjectMeasure), { headers: this.headers }).subscribe(
                        () => { this.projectMeasureService.getLinks(); }),
                remove: (key) => this.http.delete<any>(this.baseUrl + 'ProjectMeasure/' + key, {}).subscribe(() => { this.projectMeasureService.getLinks(); })
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

    linksReceived = (data: IProjectMeasure[]) => {
        this.links = data;
        this.dataGrid.instance.refresh();
    }

    projectsReceived = (data1: IProject[]) => {
        this.projects = data1;
        this.dataGrid.instance.refresh();
    }

    measureReceived = (data2: IMeasure[]) => {
        this.measures = data2;
        this.dataGrid.instance.refresh();
    }

    ngOnInit() {

    }

}
