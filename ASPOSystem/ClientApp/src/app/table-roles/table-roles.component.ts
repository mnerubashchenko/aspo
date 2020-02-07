import { Component, enableProdMode, ViewChild, Inject } from '@angular/core';
import { IRoles, RoleService } from './RoleService';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import CustomStore from "devextreme/data/custom_store";
import { DxDataGridComponent } from 'devextreme-angular';

@Component({
  selector: 'app-table-roles',
  templateUrl: './table-roles.component.html',
  styleUrls: ['./table-roles.component.css']
})
export class TableRolesComponent {
    public roles: IRoles[];
    @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;
    store: any;
    headers: HttpHeaders;
    constructor(private roleService: RoleService, public http: HttpClient, @Inject('BASE_URL') public baseUrl: string) {
        sessionStorage.setItem("locale", 'ru');
        this.roleService.subject.subscribe(this.rolesReceived);
        this.roleService.getRoles();
        this.baseUrl = baseUrl;
        this.headers = new HttpHeaders().set('content-type', 'application/json');
        this.store = new CustomStore({
          key: "idRole",
            load: () => this.roles,
          insert: (values) => this.http.post<any>(this.baseUrl + 'Roles/CreateRole', JSON.stringify(values as IRoles), { headers: this.headers }).subscribe(
              () => { this.roleService.getRoles(); }),
          update: (key, values) =>
              this.http.put<any>(this.baseUrl + 'Roles/UpdateRole', JSON.stringify(values as IRoles), { headers: this.headers }).subscribe(
                () => { this.roleService.getRoles(); }),
            remove: (key) => this.http.delete<any>(this.baseUrl + 'Roles/DeleteRole', { params: new HttpParams().set('idRole', key) }).subscribe(() => { this.roleService.getRoles(); })
        });
    }

    onRowUpdating(e) {
      for (var property in e.oldData) {
        if (!e.newData.hasOwnProperty(property)) {
          e.newData[property] = e.oldData[property];
        }
      }
    }

    rolesReceived = (data: IRoles[]) => {
        this.roles = data;
        this.dataGrid.instance.refresh();
    }

    ngOnInit() {

    }

}
