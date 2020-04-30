import { Component, enableProdMode, ViewChild, Inject } from '@angular/core';
import { IProject, ProjectService } from '../table-projects/ProjectService';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import CustomStore from "devextreme/data/custom_store";
import { DxDataGridComponent } from 'devextreme-angular';
import { IUsers, UsersService } from '../table-users/UsersService';

@Component({
  selector: 'app-table-projects',
  templateUrl: './table-projects.component.html',
  styleUrls: ['./table-projects.component.css']
})
export class TableProjectsComponent {
    public projects: IProject[];
    public users: IUsers[];
    @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;
    store: any;
    headers: HttpHeaders;
    constructor(private projectService: ProjectService, private usersService: UsersService,
        public http: HttpClient, @Inject('BASE_URL') public baseUrl: string) {
        sessionStorage.setItem("locale", 'ru');
        
        this.projectService.subject.subscribe(this.projectReceived);
        this.projectService.getProjects();

        this.usersService.subject.subscribe(this.usersReceived);
        this.usersService.getUsers("full");

        this.baseUrl = baseUrl;
        this.headers = new HttpHeaders().set('content-type', 'application/json');
        setTimeout(() => {
            this.store = new CustomStore({
                key: "id",
                load: () => this.projects,
                insert: (values) => this.http.post<any>(this.baseUrl + 'Projects/CreateProject', JSON.stringify(values as IProject), { headers: this.headers }).subscribe(
                    () => { this.projectService.getProjects(); }),
                update: (key, values) =>
                    this.http.put<any>(this.baseUrl + 'Projects/UpdateProject', JSON.stringify(values as IProject), { headers: this.headers }).subscribe(
                        () => { this.projectService.getProjects(); }),
                remove: (key) => this.http.delete<any>(this.baseUrl + 'Projects/DeleteProject', { params: new HttpParams().set('idProject', key) }).subscribe(() => { this.projectService.getProjects(); })
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

    projectReceived = (data: IProject[]) => {
        this.projects = data;
        this.dataGrid.instance.refresh();
    }

    usersReceived = (data2: IUsers[]) => {
        this.users = data2;
        this.dataGrid.instance.refresh();
    }

    ngOnInit() {

    }

}
