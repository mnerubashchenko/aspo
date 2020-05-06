/* Компонент таблицы измерений.
 * Название: TablePostsComponent.
 * Язык: TypeScript.
 * Краткое описание:
 *    Данный компонент является страницей, отображающей информацию о должностях пользователей в расширенной версии приложения.
 * Переменные, используемые в компоненте:
 *    posts - информация о должностях;
 *    dataGrid - таблица, содержащая информацию о должностях;
 *    store - логика отправки данных о должностях на сервер;
 *    headers - HTTP заголовки для формирования HTTP запроса.
 * Методы, используемые в компоненте:
 *    onRowUpdating() - формирование набора данных о должностях после редактирования для отправки на сервер;
 *    asyncValidation() - проверка валидности данных при изменении информации о должности;
 *    postsReceived() - получение данных о должностях из сервиса PostService.
 */

import { Component, enableProdMode, ViewChild, Inject } from '@angular/core';
import { IPosts, PostService } from './PostService';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { DxDataGridComponent } from 'devextreme-angular';
import CustomStore from "devextreme/data/custom_store";

@Component({
  selector: 'app-table-posts',
  templateUrl: './table-posts.component.html',
  styleUrls: ['./table-posts.component.css']
})
export class TablePostsComponent {
    public posts: IPosts[];
    @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;
    store: any;
    headers: HttpHeaders;

  /* Конструктор компонента TablePostsComponent.
   * Переменные, используемые в конструкторе:
   *      postService - экземпляр сервиса PostService;
   *      http - HTTP клиент;
   *      baseUrl - базовый URL адрес.
   */
  constructor(private postService: PostService, public http: HttpClient, @Inject('BASE_URL') public baseUrl: string) {
        sessionStorage.setItem("locale", 'ru');
        this.asyncValidation = this.asyncValidation.bind(this);
        this.postService.subject.subscribe(this.postsReceived);
        this.postService.getPosts("not full");
        this.baseUrl = baseUrl;
        this.headers = new HttpHeaders().set('content-type', 'application/json');
        this.store = new CustomStore({
          key: "id",
          load: () => this.posts,
          insert: (values) => this.http.post<any>(this.baseUrl + 'Posts/CreatePost', JSON.stringify(values as IPosts), { headers: this.headers }).subscribe(
            () => { this.postService.getPosts("not full"); }),
          update: (key, values) =>
              this.http.put<any>(this.baseUrl + 'Posts/UpdatePost', JSON.stringify(values as IPosts), { headers: this.headers }).subscribe(
                () => { this.postService.getPosts("not full"); }),
            remove: (key) => this.http.delete<any>(this.baseUrl + 'Posts/DeletePost', { params: new HttpParams().set('idPost', key) }).subscribe(() => { this.postService.getPosts("not full"); })
        });
    }

   /* onRowUpdating() - формирование набора данных о должностях после редактирования для отправки на сервер.
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

   /* asyncValidation() - проверка валидности данных при изменении информации о должностях.
    * Формальный параметр:
    *      params - значение, которое валидируется.
    * Локальные переменные:
    *      cleanPostsValidate - набор должностей, после удаления изменяемой должности;
    *      check - флаг, определяющий, уникально ли входное значение.
    */
  asyncValidation(params) {
    let cleanPostsValidate = this.posts.filter(item => item.id != params.data.id);
    let check = (cleanPostsValidate.find(item => item.namePost.toLowerCase() == params.value.toLowerCase()) != null) ? false : true;
    return new Promise((resolve) => {
      resolve(check === true);
    });
  }

   /* postsReceived() - получение данных о должностях из сервиса PostService.
    * Формальный параметр:
    *      data - данные, пришедшие из сервиса MeasureService.
    */
    postsReceived = (data: IPosts[]) => {
        this.posts = data;
        this.dataGrid.instance.refresh();
    }

}
