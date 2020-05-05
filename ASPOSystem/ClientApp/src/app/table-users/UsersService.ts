/* Сервис компонента TableUsersComponent.
 * Название: UsersService.
 * Язык: TypeScript.
 * Краткое описание:
 *    Данный сервис описывает поля таблицы пользователей и позволяет получить данные из этой таблицы.
 * Переменные, используемые в сервисе:
 *    users - информация о пользователях, полученная из базы данных;
 *    subject - объект Observable;
 *    headers - HTTP заголовки для формирования HTTP запроса.
 * Методы, используемые в сервисе:
 *    getUsers() - получение данных из таблицы пользователей;
 *    getUserForAccount() - получение данных об авторизированном пользователе.
 * Интерфейс, описываемый в сервисе:
 *    IUsers - интерфейс, описывающий таблицу пользователей.
 */
import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class UsersService {
    users: IUsers[];
    subject = new Subject<IUsers[]>();
  headers: HttpHeaders;

  /* Конструктор сервиса UsersService.
   * Переменные, используемые в конструкторе:
   *      http - HTTP клиент;
   *      baseUrl - базовый URL адрес.
   */
  constructor(public http: HttpClient, @Inject('BASE_URL') public baseUrl: string) {
    this.headers = new HttpHeaders().set('content-type', 'application/json');
  }

/* getUsers() - получение данных из таблицы пользователей.
 * Формальный параметр:
 *      correction - параметр, уточняющий, все ли данные нужны.
 */
  getUsers(correction: string) {
    this.http.get<any>(this.baseUrl + 'Users/GetUsers', {
      params: new HttpParams().set("correction", correction)
    }).subscribe(result => {
        this.users = result as IUsers[];
        this.subject.next(this.users);
    }, error => console.error(error));
  }

/* getUserForAccount() - пполучение данных об авторизированном пользователе. */
  getUserForAccount() {
    this.http.get<any>(this.baseUrl + "Users/GetUserForAccount", {
      params: new HttpParams().set("login", localStorage.getItem("login"))
      }).subscribe(result => {
      this.users = result as IUsers[];
      this.subject.next(this.users);
      }, error => console.error(error));
  }
}

/* IUsers - интерфейс, описывающий таблицу пользователей.
 * Свойства интерфейса:
 *      id - идентификатор пользователя;
 *      nameUser - имя пользователя;
 *      middlenameUser - фамилия пользователя;
 *      lastnameUser - отчество пользователя;
 *      loginUser - логин пользователя;
 *      passwordUser - пароль пользователя;
 *      postUser - должность пользователя;
 *      roleUser - роль пользователя.
 */
export interface IUsers {
    id: string;
    nameUser: string;
    middlenameUser: string;
    lastnameUser: string;
    loginUser: string;
    passwordUser: string;
    postUser: string;
    roleUser: string;
}
