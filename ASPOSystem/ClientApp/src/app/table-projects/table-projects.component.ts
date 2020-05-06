/* Компонент таблицы протоколов.
 * Название: TableProjectsComponent.
 * Язык: TypeScript.
 * Краткое описание:
 *    Данный компонент является страницей, отображающей информацию о протоколах в расширенной версии приложения.
 * Переменные, используемые в компоненте:
 *    projects - информация о протоколах;
 *    dataGrid - таблица, содержащая информацию о протоколах;
 *    store - логика отправки данных о протоколах на сервер;
 *    headers - HTTP заголовки для формирования HTTP запроса.
 * Методы, используемые в компоненте:
 *    onRowUpdating() - формирование набора данных о протоколах после редактирования для отправки на сервер;
 *    asyncValidation() - проверка валидности данных при изменении информации о протоколе;
 *    projectReceived() - получение данных о протоколах из сервиса ProjectService;
 *    usersReceived() - получение данных о пользователях из сервиса UsersService.
 */

import { Component, ViewChild, Inject, ViewEncapsulation } from '@angular/core';
import { IProject, ProjectService } from '../table-projects/ProjectService';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import CustomStore from "devextreme/data/custom_store";
import { DxDataGridComponent } from 'devextreme-angular';
import { IUsers, UsersService } from '../table-users/UsersService';

@Component({
  selector: 'app-table-projects',
  templateUrl: './table-projects.component.html',
  styleUrls: ['./table-projects.component.css'],
})

export class TableProjectsComponent {
    public projects: IProject[];
    public users: IUsers[];
    @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;
    store: any;
    headers: HttpHeaders;

  /* Конструктор компонента TableProjectsComponent.
   * Переменные, используемые в конструкторе:
   *      projectService - экземпляр сервиса ProjectService;
   *      usersService - экземпляр сервиса UsersService;
   *      http - HTTP клиент;
   *      baseUrl - базовый URL адрес.
   */
    constructor(private projectService: ProjectService, private usersService: UsersService,
        public http: HttpClient, @Inject('BASE_URL') public baseUrl: string) {
        sessionStorage.setItem("locale", 'ru');

        this.asyncValidation = this.asyncValidation.bind(this);
        
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

   /* onRowUpdating() - формирование набора данных о протоколах после редактирования для отправки на сервер.
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

   /* asyncValidation() - проверка валидности данных при изменении информации о протоколах.
    * Формальный параметр:
    *      params - значение, которое валидируется.
    * Локальные переменные:
    *      cleanProjectValidate - набор протоколов, после удаления изменяемого протокола;
    *      check - флаг, определяющий, уникально ли входное значение.
    */
  asyncValidation(params) {
    let cleanProjectValidate = this.projects.filter(item => item.id != params.data.id);
    let check = (cleanProjectValidate.find(item => item.nameProject.toLowerCase() == params.value.toLowerCase()) != null) ? false : true;
    return new Promise((resolve) => {
        resolve(check === true);
    });
  }

   /* projectReceived() - получение данных о протоколах из сервиса ProjectService.
    * Формальный параметр:
    *      data - данные, пришедшие из сервиса ProjectService.
    */
    projectReceived = (data: IProject[]) => {
        this.projects = data;
        this.dataGrid.instance.refresh();
    }

   /* usersReceived() - получение данных о пользователях из сервиса UsersService.
    * Формальный параметр:
    *      data - данные, пришедшие из сервиса UsersService.
    */
    usersReceived = (data2: IUsers[]) => {
        this.users = data2;
        this.dataGrid.instance.refresh();
    }

}
