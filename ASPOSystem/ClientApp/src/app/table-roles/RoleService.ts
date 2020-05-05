/* Сервис компонента TableRolesComponent.
 * Название: RoleService.
 * Язык: TypeScript.
 * Краткое описание:
 *    Данный сервис описывает поля таблицы ролей пользователей и позволяет получить данные из этой таблицы.
 * Переменные, используемые в сервисе:
 *    roles - информация о ролях, полученная из базы данных;
 *    subject - объект Observable;
 *    headers - HTTP заголовки для формирования HTTP запроса.
 * Метод, используемый в сервисе:
 *    getRoles() - получение данных из таблицы ролей.
 * Интерфейс, описываемый в сервисе:
 *    IRoles - интерфейс, описывающий таблицу ролей.
 */

import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class RoleService {
    roles: IRoles[];
    subject = new Subject<IRoles[]>();
    headers: HttpHeaders;

  /* Конструктор сервиса RoleService.
   * Переменные, используемые в конструкторе:
   *      http - HTTP клиент;
   *      baseUrl - базовый URL адрес.
   */
  constructor(public http: HttpClient, @Inject('BASE_URL') public baseUrl: string ) {
    this.headers = new HttpHeaders().set('content-type', 'application/json');
  }

/* getRoles() - получение данных из таблицы ролей.
 * Формальный параметр:
 *      correction - параметр, уточняющий, все ли данные нужны.
 */
  getRoles(correction: string) {
    this.http.get<any>(this.baseUrl + 'Roles/GetRole', {
      params: new HttpParams().set("correction", correction)
    }).subscribe(result => {
        this.roles = result as IRoles[];
        this.subject.next(this.roles);
    }, error => console.error(error));
    }
}

/* IRoles - интерфейс, описывающий таблицу ролей.
 * Свойства интерфейса:
 *      id - идентификатор роли;
 *      nameRole - название роли.
 */
export interface IRoles {
  id: string;
  nameRole: string;
}
