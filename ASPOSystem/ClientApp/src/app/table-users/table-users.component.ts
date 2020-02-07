import { Component, enableProdMode, ViewChild, Inject } from '@angular/core';
import { IUsers, UsersService } from './UsersService';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import CustomStore from "devextreme/data/custom_store";
import { DxDataGridComponent } from 'devextreme-angular';

@Component({
    selector: 'app-table-users',
    templateUrl: './table-users.component.html',
    styleUrls: ['./table-users.component.css']
})
export class TableUsersComponent {
    public users: IUsers[];
    @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;
    store: any;
    headers: HttpHeaders;
    constructor(private usersService: UsersService, public http: HttpClient, @Inject('BASE_URL') public baseUrl: string) {
        sessionStorage.setItem("locale", 'ru');
        this.usersService.subject.subscribe(this.usersReceived);
        this.usersService.getUsers();
        this.baseUrl = baseUrl;
        this.headers = new HttpHeaders().set('content-type', 'application/json');
        this.store = new CustomStore({
            key: "idUser",
            load: () => this.users,
            insert: (values) => this.http.post<any>(this.baseUrl + 'Users/CreateUser', JSON.stringify(values as IUsers), { headers: this.headers }).subscribe(
                () => { this.usersService.getUsers(); }),
            update: (key, values) =>
                this.http.put<any>(this.baseUrl + 'Users/UpdateUser', JSON.stringify(values as IUsers), { headers: this.headers }).subscribe(
                    () => { this.usersService.getUsers(); }),
            remove: (key) => this.http.delete<any>(this.baseUrl + 'Users/DeleteUser', { params: new HttpParams().set('idUser', key) }).subscribe(() => { this.usersService.getUsers(); })
        });
    }

    onRowUpdating(e) {
        for (var property in e.oldData) {
            if (!e.newData.hasOwnProperty(property)) {
                e.newData[property] = e.oldData[property];
            }
        }
    }

    usersReceived = (data: IUsers[]) => {
        this.users = data;
        this.dataGrid.instance.refresh();
    }

    ngOnInit() {

    }

}
