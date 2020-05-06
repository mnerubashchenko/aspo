/* Компонент таблицы комментариев к протоколам.
 * Название: TableCommentsComponent.
 * Язык: TypeScript.
 * Краткое описание:
 *    Данный компонент является страницей, отображающей комментарии к протоколам в расширенной версии приложения.
 * Переменные, используемые в компоненте:
 *    comments - комментарии к протоколам;
 *    projects - информация о протоколах;
 *    users - информация о пользователях;
 *    dataGrid - таблица, содержащая комментарии к протоколам;
 *    store - логика отправки данных о комментариях к протоколам на сервер;
 *    headers - HTTP заголовки для формирования HTTP запроса.
 * Методы, используемые в компоненте:
 *    onRowUpdating() - формирование набора данных о комментариях к протоколам после редактирования для отправки на сервер;
 *    commentReceived() - получение данных из сервиса CommentsService;
 *    usersReceived() - получение данных из сервиса UsersService;
 *    projectsReceived() - получение данных из сервиса ProjectService;
 */

import { Component, ViewChild, Inject } from '@angular/core';
import { CommentsService, IComments } from './CommentsService';
import CustomStore from "devextreme/data/custom_store";
import { DxDataGridComponent } from 'devextreme-angular';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { IProject, ProjectService } from '../table-projects/ProjectService';
import { IUsers, UsersService } from '../table-users/UsersService';

@Component({
  selector: 'app-table-comments',
  templateUrl: './table-comments.component.html',
  styleUrls: ['./table-comments.component.css']
})
export class TableCommentsComponent {
  public comments: IComments[];
  public projects: IProject[];
  public users: IUsers[];
  @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;
  store: any;
  headers: HttpHeaders;

  /* Конструктор компонента TableCommentsComponent.
   * Переменные, используемые в конструкторе:
   *      commentsService - экземпляр сервиса CommentsService;
   *      projectService - экземпляр сервиса ProjectService;
   *      usersService - экземпляр сервиса UsersService;
   *      http - HTTP клиент;
   *      baseUrl - базовый URL адрес.
   */
  constructor(private commentsService: CommentsService, private projectService: ProjectService,
    private usersService: UsersService, public http: HttpClient, @Inject('BASE_URL') public baseUrl: string) {
    sessionStorage.setItem("locale", 'ru');

    this.commentsService.subject.subscribe(this.commentReceived);
    this.commentsService.getComments();

    this.usersService.subject.subscribe(this.usersReceived);
    this.usersService.getUsers("full");

    this.projectService.subject.subscribe(this.projectsReceived);
    this.projectService.getProjects();

    this.baseUrl = baseUrl;
    this.headers = new HttpHeaders().set('content-type', 'application/json');
    this.store = new CustomStore({
      key: "id",
      load: () => this.comments,
      insert: (values) => this.http.post<any>(this.baseUrl + 'Comments/CreateComment', JSON.stringify(values as IComments), { headers: this.headers }).subscribe(
        () => { this.commentsService.getComments(); }),
      update: (key, values) =>
        this.http.put<any>(this.baseUrl + 'Comments/UpdateComment', JSON.stringify(values as IComments), { headers: this.headers }).subscribe(
          () => { this.commentsService.getComments(); }),
      remove: (key) => this.http.delete<any>(this.baseUrl + 'Comments/DeleteComment', { params: new HttpParams().set('id', key) }).subscribe(() => { this.commentsService.getComments(); })
    });
  }

   /* onRowUpdating() - формирование набора данных о комментариях к протоколам после редактирования для отправки на сервер.
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

   /* commentReceived() - получение данных о брендах устройств из сервиса CommentsService.
    * Формальный параметр:
    *      data - данные, пришедшие из сервиса CommentsService.
    */
  commentReceived = (data: IComments[]) => {
    this.comments = data;
    this.dataGrid.instance.refresh();
  }

   /* usersReceived() - получение данных о брендах устройств из сервиса UsersService.
    * Формальный параметр:
    *      data2 - данные, пришедшие из сервиса UsersService.
    */
  usersReceived = (data2: IUsers[]) => {
    this.users = data2;
    this.dataGrid.instance.refresh();
  }

   /* projectsReceived() - получение данных о брендах устройств из сервиса ProjectService.
    * Формальный параметр:
    *      data3 - данные, пришедшие из сервиса ProjectService.
    */
  projectsReceived = (data3: IProject[]) => {
    this.projects = data3;
    this.dataGrid.instance.refresh();
  }

}
