import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import CustomStore from "devextreme/data/custom_store";
import { IUsers, UsersService } from '../table-users/UsersService';
import { IRoles, RoleService } from '../table-roles/RoleService';
import { IPosts, PostService } from '../table-posts/PostService';
import { ICategory, CategoryService } from '../table-view/CategoryService';
import { IProject, ProjectService } from '../table-projects/ProjectService';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { DxDataGridComponent } from 'devextreme-angular';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
    @ViewChild('accountForm') form: NgForm;
    @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;
    public roles: IRoles[];
    public posts: IPosts[];
    public projects: IProject[];
    public user: IUsers[] = [{ IdUser: '', NameUser: '', MiddlenameUser: '', LastnameUser: '', LoginUser: '', PasswordUser: '', RoleUser: '', PostUser: '' }];
    public categories: ICategory[];
    public flagForReadOnly: boolean = true;
    public flagForChangeButtons: boolean = false;
    store: any;
    

    headers: HttpHeaders = new HttpHeaders({
        "Content-Type": "application/json"
    });

    constructor(private usersService: UsersService, private roleService: RoleService,
        private postService: PostService, private projectService: ProjectService, private categoryService: CategoryService,
      private http: HttpClient, @Inject('BASE_URL') public baseUrl: string, private router: Router) {

      //params: new HttpParams().set("login", "Телеметрия");

        Observable.forkJoin(
            this.http.get<any>(this.baseUrl + "Users/GetUserForAccount", {
                params: new HttpParams().set("login", localStorage.getItem("login"))
            }),
            this.http.get<any>(this.baseUrl + 'Roles/GetRole'),
            this.http.get<any>(this.baseUrl + 'Posts/GetPost'),
            this.http.get<any>(this.baseUrl + "Projects/GetPersonalProjects", {
                params: new HttpParams().set("author", localStorage.getItem("login"))
            }),
            this.http.get<any>(this.baseUrl + 'Category/GetCategory')
        ).subscribe(([res1, res2, res3, res4, res5]) => {
            this.user = res1;
            this.roles = res2;
            this.posts = res3;
            this.projects = res4;
            this.categories = res5;
        });

        //this.usersService.subjectAuth.subscribe(this.userAccountReceived);
        //this.usersService.getUserForAccount();

        //this.roleService.subject.subscribe(this.rolesReceived);
        //this.roleService.getRoles();

        //this.postService.subject.subscribe(this.postsReceived);
        //this.postService.getPosts();

        this.projectService.subject.subscribe(this.projectReceived);
        //this.projectService.getPersonalProjects();

        //this.categoryService.subject.subscribe(this.categoryReceived);
        //this.categoryService.getCategories();

        this.headers = new HttpHeaders().set('content-type', 'application/json');
        setTimeout(() => {
            this.store = new CustomStore({
                key: "idProject",
                load: () => this.projects,
                insert: (values) => this.http.post<any>(this.baseUrl + 'Projects/CreateProject', JSON.stringify(values as IProject), { headers: this.headers }).subscribe(
                    () => { this.projectService.getPersonalProjects(); }),
                update: (key, values) =>
                    this.http.put<any>(this.baseUrl + 'Projects/UpdateProject', JSON.stringify(values as IProject), { headers: this.headers }).subscribe(
                        () => { this.projectService.getPersonalProjects(); }),
                remove: (key) => this.http.delete<any>(this.baseUrl + 'Projects/DeleteProject', { params: new HttpParams().set('idProject', key) }).subscribe(() => { this.projectService.getPersonalProjects(); })
            });
        }, 1000);
    }

    ngOnInit() {
    }

    userAccountReceived = (data: IUsers[]) => {
        this.user = data;
    }

    //rolesReceived = (data1: IRoles[]) => {
    //    this.roles = data1;
    //}

    //postsReceived = (data2: IPosts[]) => {
    //    this.posts = data2;
    //}

    projectReceived = (data3: IProject[]) => {
        this.projects = data3;
        this.dataGrid.instance.refresh();
    }

    //categoryReceived = (data4: ICategory[]) => {
    //    this.categories = data4;
    //    this.dataGrid.instance.refresh();
    //}

    onRowUpdating(e) {
        for (var property in e.oldData) {
            if (!e.newData.hasOwnProperty(property)) {
                e.newData[property] = e.oldData[property];
            }
        }
    }

    private buttonIsPressed() {
        this.flagForReadOnly = !this.flagForReadOnly;
        this.flagForChangeButtons = true;
    }

    private isChanged() {
        return this.flagForReadOnly;
    }

    private cancel() {
        this.usersService.subjectAuth.subscribe(this.userAccountReceived);
        this.usersService.getUserForAccount();
        this.form.resetForm(this.user[0]);
        this.flagForReadOnly = !this.flagForReadOnly;
        this.flagForChangeButtons = false;
    }

  private ConfigMaker() {
    this.http.post<any>(this.baseUrl + 'JSONMaker/ConfigMaker', { headers: this.headers }, { params: new HttpParams().set("telname", "gavno").set("commandname", "team1") }).subscribe();
    }

    public account = (form: NgForm) => {
        this.http.put<any>(this.baseUrl + "Users/UpdateUser", JSON.stringify(form.value as IUsers), {
            headers: new HttpHeaders({
                "Content-Type": "application/json"
            })
        }).subscribe();
        this.flagForChangeButtons = false;
        this.flagForReadOnly = !this.flagForReadOnly;
    }
}
