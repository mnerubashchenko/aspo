/* Сервис компонента TableTypeDevComponent.
 * Название: TypedevService.
 * Язык: TypeScript.
 * Краткое описание:
 *    Данный сервис описывает поля таблицы типов устройств и позволяет получить данные из этой таблицы.
 * Переменные, используемые в сервисе:
 *    typesdev - информация о типах устройств, полученная из базы данных;
 *    subject - объект Observable;
 *    headers - HTTP заголовки для формирования HTTP запроса.
 * Метод, используемый в сервисе:
 *    getTypedev() - получение данных из таблицы типов устройств.
 * Интерфейс, описываемый в сервисе:
 *    ITypedev - интерфейс, описывающий таблицу типов устройств.
 */

import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class TypedevService {
    typesdev: ITypedev[];
    subject = new Subject<ITypedev[]>();
    headers: HttpHeaders;

  /* Конструктор сервиса TypedevService.
   * Переменные, используемые в конструкторе:
   *      http - HTTP клиент;
   *      baseUrl - базовый URL адрес.
   */
  constructor(public http: HttpClient, @Inject('BASE_URL') public baseUrl: string) {
    this.headers = new HttpHeaders().set('content-type', 'application/json');
  }

/* getTypedev() - получение данных из таблицы типов устройств.
 * Формальный параметр:
 *      correction - параметр, уточняющий, все ли данные нужны.
 */
  getTypedev(correction: string) {
    this.http.get<any>(this.baseUrl + 'Typedev/GetTypedev', {
      params: new HttpParams().set("correction", correction)
    }).subscribe(result => {
        this.typesdev = result as ITypedev[];
        this.subject.next(this.typesdev);
    }, error => console.error(error));
  }
}

/* ITypedev - интерфейс, описывающий таблицу типов устройств.
 * Свойства интерфейса:
 *      id - идентификатор типа устройства;
 *      nameTypedev - название типа устройства.
 */
export interface ITypedev {
  id: string;
  nameTypedev: string;
}
