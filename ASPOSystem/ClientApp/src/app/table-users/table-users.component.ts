/* Компонент таблицы пользователей.
 * Название: TableUsersComponent.
 * Язык: TypeScript.
 * Краткое описание:
 *    Данный компонент является страницей, отображающей информацию о пользователях в расширенной версии приложения.
 * Переменные, используемые в компоненте:
 *    users - информация о пользователях;
 *    roles - информация о ролях пользователей;
 *    posts - информация о должностях пользователей;
 *    dataGrid - таблица, содержащая информацию о пользователях;
 *    store - логика отправки данных о пользователях на сервер;
 *    headers - HTTP заголовки для формирования HTTP запроса;
 *    loginPattern - правило, которому должен соответствовать логин пользователя.
 * Методы, используемые в компоненте:
 *    onRowUpdating() - формирование набора данных о пользователях после редактирования для отправки на сервер;
 *    asyncValidation() - проверка валидности данных при изменении информации о пользователе;
 *    usersReceived() - получение данных о пользователях из сервиса UsersService;
 *    postsReceived() - получение данных о должностях пользователей из сервиса PostService;
 *    rolesReceived() - получение данных о ролях пользователей из сервиса RoleService.
 */

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
    public roles: IRoles[];
    public posts: IPosts[];
    @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;
    store: any;
    headers: HttpHeaders;
    loginPattern: any = /^[A-Za-z0-9]+$/;

  /* Конструктор компонента TableUsersComponent.
   * Переменные, используемые в конструкторе:
   *      usersService - экземпляр сервиса UsersService;
   *      roleService - экземпляр сервиса RoleService;
   *      postService - экземпляр сервиса PostService;
   *      http - HTTP клиент;
   *      baseUrl - базовый URL адрес.
   */
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

   /* onRowUpdating() - формирование набора данных о пользователях после редактирования для отправки на сервер.
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


   /* asyncValidation() - проверка валидности данных при изменении информации о пользователях.
    * Формальный параметр:
    *      params - значение, которое валидируется.
    * Локальные переменные:
    *      cleanUsersValidate - набор пользователей, после удаления изменяемого пользователя;
    *      check - флаг, определяющий, уникально ли входное значение.
    */
  asyncValidation(params) {
    let cleanUsersValidate = this.users.filter(item => item.id != params.data.id);
    let check = (cleanUsersValidate.find(item => item.loginUser == params.value) != null) ? false : true;
    return new Promise((resolve) => {
      resolve(check === true);
    });
  }

   /* usersReceived() - получение данных о пользователях из сервиса UsersService.
    * Формальный параметр:
    *      data - данные, пришедшие из сервиса UsersService.
    */
    usersReceived = (data: IUsers[]) => {
        this.users = data;
        this.dataGrid.instance.refresh();
    }

   /* postsReceived() - получение данных о должностях пользователей из сервиса PostService.
    * Формальный параметр:
    *      data1 - данные, пришедшие из сервиса PostService.
    */
    postsReceived = (data1: IPosts[]) => {
        this.posts = data1;
        this.dataGrid.instance.refresh();
    }

   /* rolesReceived() - получение данных о ролях пользователей из сервиса RoleService.
    * Формальный параметр:
    *      data2 - данные, пришедшие из сервиса RoleService.
    */
    rolesReceived = (data2: IRoles[]) => {
        this.roles = data2;
        this.dataGrid.instance.refresh();
    }


}
