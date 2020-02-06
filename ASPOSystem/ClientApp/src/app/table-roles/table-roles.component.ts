import { Component, enableProdMode, ViewChild, Inject } from '@angular/core';
import { IRoles, RoleService } from './RoleService';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import CustomStore from "devextreme/data/custom_store";
import { DxDataGridComponent } from 'devextreme-angular';

@Component({
  selector: 'app-table-roles',
  templateUrl: './table-roles.component.html',
  styleUrls: ['./table-roles.component.css']
})
export class TableRolesComponent {
    public roles: IRoles[];
    @ViewChild(DxDataGridComponent, { static: false }) dataGrid: DxDataGridComponent;
    store: any;
    headers: HttpHeaders;
    constructor(private roleService: RoleService, public http: HttpClient, @Inject('BASE_URL') public baseUrl: string) {
        this.roleService.subject.subscribe(this.rolesReceived);
        this.roleService.getRoles();
        this.baseUrl = baseUrl;
        this.headers = new HttpHeaders().set('content-type', 'application/json');
        this.store = new CustomStore({
          key: "idRole",
            load: () => this.roles,
          insert: (values) => this.http.post<any>(this.baseUrl + 'Roles/CreateRole', JSON.stringify(values as IRoles), { headers: this.headers }).subscribe(
              () => { this.roleService.getRoles(); }),
          //update: (key, values) => {
          //  console.log(key,values);
          //},
          //remove: (key) => {
          //  console.log(key);
          //}
        });
    }

    rolesReceived = (data: IRoles[]) => {
        this.roles = data;
        this.dataGrid.instance.refresh();
    }

    ngOnInit() {

    }

}
