import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import CustomStore from "devextreme/data/custom_store";
import { IUsers, UsersService } from '../table-users/UsersService';
import { IRoles, RoleService } from '../table-roles/RoleService';
import { IPosts, PostService } from '../table-posts/PostService';
import { IProject, ProjectService } from '../table-projects/ProjectService';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { DxDataGridComponent } from 'devextreme-angular';
import { Observable } from 'rxjs';
import notify from 'devextreme/ui/notify';

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
    public user: IUsers[] = [{ id: '', nameUser: '', middlenameUser: '', lastnameUser: '', loginUser: '', passwordUser: '', roleUser: '', postUser: '' }];
    public flagForReadOnly: boolean = true;
    public flagForChangeButtons: boolean = false;
    store: any;
    loginPattern: any = /^[A-Za-z0-9]+$/;

    headers: HttpHeaders = new HttpHeaders({
        "Content-Type": "application/json"
    });

    constructor(private usersService: UsersService, private roleService: RoleService,
        private postService: PostService, private projectService: ProjectService,
      private http: HttpClient, @Inject('BASE_URL') public baseUrl: string, private router: Router) {

        Observable.forkJoin(
            this.http.get<any>(this.baseUrl + "Users/GetUserForAccount", {
                params: new HttpParams().set("login", localStorage.getItem("login"))
            }),
            this.http.get<any>(this.baseUrl + 'Roles/GetRole', { params: new HttpParams().set("correction", "full") }),
            this.http.get<any>(this.baseUrl + 'Posts/GetPost', { params: new HttpParams().set("correction", "full") }),
            this.http.get<any>(this.baseUrl + "Projects/GetPersonalProjects", {
                params: new HttpParams().set("author", localStorage.getItem("login"))
            }),
        ).subscribe(([res1, res2, res3, res4]) => {
            this.user = res1;
            this.roles = res2;
            this.posts = res3;
            this.projects = res4;
        });

        this.projectService.subject.subscribe(this.projectReceived);
        this.projectService.getPersonalProjects();


        this.headers = new HttpHeaders().set('content-type', 'application/json');
        setTimeout(() => {
            this.store = new CustomStore({
                key: "id",
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

    projectReceived = (data3: IProject[]) => {
        this.projects = data3;
        this.dataGrid.instance.refresh();
    }

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
        this.usersService.subject.subscribe(this.userAccountReceived);
        this.usersService.getUserForAccount();
        this.form.resetForm(this.user[0]);
        this.flagForReadOnly = !this.flagForReadOnly;
        this.flagForChangeButtons = false;
    }

  public account = (form: NgForm) => {
    if (form.controls.middlenameUser.value == this.user[0].middlenameUser
      && form.controls.nameUser.value == this.user[0].nameUser
      && form.controls.lastnameUser.value == this.user[0].lastnameUser
      && form.controls.loginUser.value == this.user[0].loginUser
      && form.controls.roleUser.value == this.user[0].roleUser
      && form.controls.postUser.value == this.user[0].postUser) {
      notify({
        message: "Вы не произвели никаких изменений", width: 300, shading: false,
        position: { my: 'top', at: 'top', of: window, offset: '0 10' },
        animation: {
          show: { duration: 300, type: "slide", from: { top: -50 } },
          hide: { duration: 300, type: "slide", to: { top: -50 } }
        }
      }, "warning", 1000);
    }

    else {
      this.http.put<any>(this.baseUrl + "Users/UpdateUser", JSON.stringify(form.value as IUsers), {
        headers: new HttpHeaders({
          "Content-Type": "application/json"
        })
      }).subscribe(res => {
        notify({
          message: "Профиль отредактирован!", width: 300, shading: false,
          position: { my: 'top', at: 'top', of: window, offset: '0 10' },
          animation: {
            show: { duration: 300, type: "slide", from: { top: -50 } },
            hide: { duration: 300, type: "slide", to: { top: -50 } }
          }
        }, "success", 1000);
        this.flagForChangeButtons = false;
        this.flagForReadOnly = !this.flagForReadOnly;
        localStorage.removeItem("login");
        localStorage.setItem("login", form.controls.loginUser.value);
        this.usersService.subject.subscribe(this.userAccountReceived);
        this.usersService.getUserForAccount();
        }, error => {
          notify({
            message: error.error, width: 300, shading: false,
            position: { my: 'top', at: 'top', of: window, offset: '0 10' },
            animation: {
              show: { duration: 300, type: "slide", from: { top: -50 } },
              hide: { duration: 300, type: "slide", to: { top: -50 } }
            }
          }, "error", 1000);
      });
    }
  }
}
