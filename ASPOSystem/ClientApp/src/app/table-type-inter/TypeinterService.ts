/* Сервис компонента TableTypeInterComponent.
 * Название: TypeinterService.
 * Язык: TypeScript.
 * Краткое описание:
 *    Данный сервис описывает поля таблицы типов интерфейсов и позволяет получить данные из этой таблицы.
 * Переменные, используемые в сервисе:
 *    typesinter - информация о типах интерфейсов, полученная из базы данных;
 *    subject - объект Observable;
 *    headers - HTTP заголовки для формирования HTTP запроса.
 * Метод, используемый в сервисе:
 *    getTypeinter() - получение данных из таблицы типов интерфейсов.
 * Интерфейс, описываемый в сервисе:
 *    ITypeinter - интерфейс, описывающий таблицу типов интерфейсов.
 */
import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class TypeinterService {
    typesinter: ITypeinter[];
    subject = new Subject<ITypeinter[]>();
    headers: HttpHeaders;

  /* Конструктор сервиса TypeinterService.
   * Переменные, используемые в конструкторе:
   *      http - HTTP клиент;
   *      baseUrl - базовый URL адрес.
   */
  constructor(public http: HttpClient, @Inject('BASE_URL') public baseUrl: string) {
    this.headers = new HttpHeaders().set('content-type', 'application/json');
  }

/* getTypeinter() - получение данных из таблицы типов интерфейсов.
 * Формальный параметр:
 *      correction - параметр, уточняющий, все ли данные нужны.
 */
  getTypeinter(correction: string) {
    this.http.get<any>(this.baseUrl + 'Typeinter/GetTypeinter', {
      params: new HttpParams().set("correction", correction)
    }).subscribe(result => {
        this.typesinter = result as ITypeinter[];
        this.subject.next(this.typesinter);
    }, error => console.error(error));
  }

}

/* ITypeinter - интерфейс, описывающий таблицу типов интерфейсов.
 * Свойства интерфейса:
 *      id - идентификатор типа интерфейса;
 *      nameTypeinter - название типа интерфейса.
 */
export interface ITypeinter {
  id: string;
  nameTypeinter: string;
}
