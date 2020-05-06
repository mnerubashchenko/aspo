/* Компонент таблицы ролей пользователей.
 * Название: TableRolesComponent.
 * Язык: TypeScript.
 * Краткое описание:
 *    Данный компонент является страницей, отображающей информацию о ролях пользователей в расширенной версии приложения.
 * Переменные, используемые в компоненте:
 *    roles - информация о ролях;
 *    dataGrid - таблица, содержащая информацию о ролях;
 *    store - логика отправки данных о ролях на сервер;
 *    headers - HTTP заголовки для формирования HTTP запроса.
 * Методы, используемые в компоненте:
 *    onRowUpdating() - формирование набора данных о ролях после редактирования для отправки на сервер;
 *    asyncValidation() - проверка валидности данных при изменении информации о роли;
 *    rolesReceived() - получение данных о ролях из сервиса RoleService.
 */

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

  /* Конструктор компонента TableRolesComponent.
   * Переменные, используемые в конструкторе:
   *      roleService - экземпляр сервиса RoleService;
   *      http - HTTP клиент;
   *      baseUrl - базовый URL адрес.
   */
    constructor(private roleService: RoleService, public http: HttpClient, @Inject('BASE_URL') public baseUrl: string) {
        sessionStorage.setItem("locale", 'ru');
        this.asyncValidation = this.asyncValidation.bind(this);
        this.roleService.subject.subscribe(this.rolesReceived);
        this.roleService.getRoles("not full");
        this.baseUrl = baseUrl;
        this.headers = new HttpHeaders().set('content-type', 'application/json');
        this.store = new CustomStore({
          key: "id",
            load: () => this.roles,
          insert: (values) => this.http.post<any>(this.baseUrl + 'Roles/CreateRole', JSON.stringify(values as IRoles), { headers: this.headers }).subscribe(
            () => { this.roleService.getRoles("not full"); }),
          update: (key, values) =>
              this.http.put<any>(this.baseUrl + 'Roles/UpdateRole', JSON.stringify(values as IRoles), { headers: this.headers }).subscribe(
                () => { this.roleService.getRoles("not full"); }),
          remove: (key) => this.http.delete<any>(this.baseUrl + 'Roles/DeleteRole', { params: new HttpParams().set('idRole', key) }).subscribe(() => { this.roleService.getRoles("not full"); })
        });
    }

   /* onRowUpdating() - формирование набора данных о ролях после редактирования для отправки на сервер.
    * Формальный параметр:
    *      e - данные строки.
    * Локальная переменная:
    *      property - переменная для перебора значений строки.
    */
    onRowUpdating(e) {
      for (var property in e.oldData) {
        if (!e.newData.hasOwnProperty(property)) {
          e.newData[property] = e.oldData[property];
        }
      }
    }

   /* asyncValidation() - проверка валидности данных при изменении информации о ролях.
    * Формальный параметр:
    *      params - значение, которое валидируется.
    * Локальные переменные:
    *      cleanRolesValidate - набор ролей, после удаления изменяемой роли;
    *      check - флаг, определяющий, уникально ли входное значение.
    */
  asyncValidation(params) {
    let cleanRolesValidate = this.roles.filter(item => item.id != params.data.id);
    let check = (cleanRolesValidate.find(item => item.nameRole.toLowerCase() == params.value.toLowerCase()) != null) ? false : true;
    return new Promise((resolve) => {
      resolve(check === true);
    });
  }

   /* rolesReceived() - получение данных о ролях из сервиса RoleService.
    * Формальный параметр:
    *      data - данные, пришедшие из сервиса RoleService.
    */
    rolesReceived = (data: IRoles[]) => {
        this.roles = data;
        this.dataGrid.instance.refresh();
    }

}
