/* Сервис компонента TablePostsComponent.
 * Название: PostService.
 * Язык: TypeScript.
 * Краткое описание:
 *    Данный сервис описывает поля таблицы должностей пользователей и позволяет получить данные из этой таблицы.
 * Переменные, используемые в сервисе:
 *    posts - информация о должностях, полученная из базы данных;
 *    subject - объект Observable;
 *    headers - HTTP заголовки для формирования HTTP запроса.
 * Метод, используемый в сервисе:
 *    getPosts() - получение данных из таблицы должностей.
 * Интерфейс, описываемый в сервисе:
 *    IPosts - интерфейс, описывающий таблицу измерений.
 */

import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class PostService {
    posts: IPosts[];
    subject = new Subject<IPosts[]>();
   headers: HttpHeaders;

  /* Конструктор сервиса PostService.
   * Переменные, используемые в конструкторе:
   *      http - HTTP клиент;
   *      baseUrl - базовый URL адрес.
   */
    constructor(public http: HttpClient, @Inject('BASE_URL') public baseUrl: string ) {
      this.headers = new HttpHeaders().set('content-type', 'application/json');
    }

  /* getPosts() - получение данных из таблицы должностей.
   * Формальный параметр:
   *      correction - параметр, уточняющий, все ли данные нужны.
   */
    getPosts(correction: string) {
      this.http.get<any>(this.baseUrl + 'Posts/GetPost', {
        params: new HttpParams().set("correction", correction)
      }).subscribe(result => {
          this.posts = result as IPosts[];
          this.subject.next(this.posts);
      }, error => console.error(error));
    }
}

/* IPosts - интерфейс, описывающий таблицу должностей.
 * Свойства интерфейса:
 *      id - идентификатор должности;
 *      namePost - название должности.
 */
export interface IPosts {
  id: string;
  namePost: string;
}
