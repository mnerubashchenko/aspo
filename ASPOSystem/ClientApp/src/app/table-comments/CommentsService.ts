/* Сервис компонента TableCommentsComponent.
 * Название: CommentsService.
 * Язык: TypeScript.
 * Краткое описание:
 *    Данный сервис описывает поля таблицы комментариев к протоколам и позволяет получить данные из этой таблицы.
 * Переменные, используемые в сервисе:
 *    comments - комментарии к протоколам, полученные из базы данных;
 *    subject - объект Observable;
 *    headers - HTTP заголовки для формирования HTTP запроса.
 * Метод, используемый в сервисе:
 *    getBrands() - получение данных из таблицы брендов устройств.
 * Интерфейс, описываемый в сервисе:
 *    IBrands - интерфейс, описывающий бренд устройства.
 */
import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class CommentsService {
  comments: IComments[];
  subject = new Subject<IComments[]>();
  headers: HttpHeaders;

   /* Конструктор сервиса CommentsService.
   * Переменные, используемые в конструкторе:
   *      http - HTTP клиент;
   *      baseUrl - базовый URL адрес.
   */
  constructor(public http: HttpClient, @Inject('BASE_URL') public baseUrl: string) {
    this.headers = new HttpHeaders().set('content-type', 'application/json');
  }

  /* getComments() - получение данных из таблицы брендов устройств. */
  getComments() {
    this.http.get<any>(this.baseUrl + 'Comments/GetComments').subscribe(result => {
      this.comments = result as IComments[];
      this.subject.next(this.comments);
    }, error => console.error(error));
  }
}

/* IComments - интерфейс, описывающий комментарии к протоколам.
 * Свойства интерфейса:
 *      id - идентификатор комментарии;
 *      authorComment - автор комментария;
 *      projectComment - проект, к которому написан комментарий;
 *      bodyComment - текст комментария;
 *      dateCreateComment - дата добавления комментария.
 */
export interface IComments {
  id: string;
  authorComment: string;
  projectComment: string;
  bodyComment: string;
  dateCreateComment: Date;
}
