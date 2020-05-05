import { Component, enableProdMode, ViewChild, Inject } from '@angular/core';
import { IUsers, UsersService } from './UsersService';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import CustomStore from "devextreme/data/custom_store";
import { DxDataGridComponent } from 'devextreme-angular';
import { IPosts, PostService } from '../table-posts/PostService';
import { IRoles, RoleService } from '../table-roles/RoleService';

@Component({
    selector: 'app-table-users',
    templateUrl: './table-users.component.html',
    styleUrls: ['./table-users.component.css']
})
export class TableUsersComponent {
    public users: IUsers[];
    public usersValidate: IUsers[];
    public roles: IRoles[];
    public posts: IPosts[];
    @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;
    store: any;
    headers: HttpHeaders;
    loginPattern: any = /^[A-Za-z0-9]+$/;
    constructor(private usersService: UsersService, private roleService: RoleService, private postService: PostService,
      public http: HttpClient, @Inject('BASE_URL') public baseUrl: string) {
        sessionStorage.setItem("locale", 'ru');

        this.asyncValidation = this.asyncValidation.bind(this);

        this.usersService.subject.subscribe(this.usersReceived);
        this.usersService.getUsers("not full");

        this.roleService.subject.subscribe(this.rolesReceived);
        this.roleService.getRoles("full");

        this.postService.subject.subscribe(this.postsReceived);
        this.postService.getPosts("full");

        this.baseUrl = baseUrl;
        this.headers = new HttpHeaders().set('content-type', 'application/json');
        setTimeout(() => {
          this.store = new CustomStore({
            key: "id",
            load: () => this.users,
            insert: (values) => this.http.post<any>(this.baseUrl + 'Users/CreateUser', JSON.stringify(values as IUsers), { headers: this.headers }).subscribe(
              () => { this.usersService.getUsers("not full"); }),
            update: (key, values) =>
              this.http.put<any>(this.baseUrl + 'Users/UpdateUser', JSON.stringify(values as IUsers), { headers: this.headers }).subscribe(
                () => { this.usersService.getUsers("not full"); }),
            remove: (key) => this.http.delete<any>(this.baseUrl + 'Users/DeleteUser', { params: new HttpParams().set('idUser', key) }).subscribe(() => { this.usersService.getUsers("not full"); })
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

  asyncValidation(params) {
    let cleanUsersValidate = this.usersValidate.filter(item => item.id != params.data.id);
    let check = (cleanUsersValidate.find(item => item.loginUser == params.value) != null) ? false : true;
    return new Promise((resolve) => {
      resolve(check === true);
    });
  }

    usersReceived = (data: IUsers[]) => {
        this.users = data;
        this.usersValidate = data;
        this.dataGrid.instance.refresh();
    }

    postsReceived = (data1: IPosts[]) => {
        this.posts = data1;
        this.dataGrid.instance.refresh();
    }

    rolesReceived = (data2: IRoles[]) => {
        this.roles = data2;
        this.dataGrid.instance.refresh();
    }

    ngOnInit() {
      
    }

}
