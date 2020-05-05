/* Сервис компонента TableProjectsComponent.
 * Название: ProjectService.
 * Язык: TypeScript.
 * Краткое описание:
 *    Данный сервис описывает поля таблицы протоколов и позволяет получить данные из этой таблицы.
 * Переменные, используемые в сервисе:
 *    projects - информация о протоколах, полученная из базы данных;
 *    persprojects - информация о протоколах, создателем которых является авторизированный пользователь;
 *    subject - объект Observable;
 *    headers - HTTP заголовки для формирования HTTP запроса.
 * Методы, используемые в сервисе:
 *    getProjects() - получение всех данных из таблицы протоколов;
 *    getPersonalProjects() - получение данных о протоколах, создателем которых является авторизированный пользователь.
 * Интерфейс, описываемый в сервисе:
 *    IProject - интерфейс, описывающий таблицу протоколов.
 */
import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ProjectService {
    projects: IProject[];
    persprojects: IProject[];
    subject = new Subject<IProject[]>();
    headers: HttpHeaders;

  /* Конструктор сервиса ProjectService.
   * Переменные, используемые в конструкторе:
   *      http - HTTP клиент;
   *      baseUrl - базовый URL адрес.
   */
  constructor(public http: HttpClient, @Inject('BASE_URL') public baseUrl: string) {
    this.headers = new HttpHeaders().set('content-type', 'application/json');
  }

  /* getProjects() - получение всех данных из таблицы протоколов. */
  getProjects() {
    this.http.get<any>(this.baseUrl + 'Projects/GetProjects').subscribe(result => {
        this.projects = result as IProject[];
        this.subject.next(this.projects);
    }, error => console.error(error));
    }

  /* getPersonalProjects() - получение данных о протоколах, создателем которых является авторизированный пользователь. */
  getPersonalProjects() {
    this.http.get<any>(this.baseUrl + "Projects/GetPersonalProjects", {
      params: new HttpParams().set("author", localStorage.getItem("login"))
      }).subscribe(result => {
      this.persprojects = result as IProject[];
      this.subject.next(this.persprojects);
      }, error => console.error(error));
  }
}

/* IProject - интерфейс, описывающий таблицу протоколов.
 * Свойства интерфейса:
 *      id - идентификатор протокола;
 *      nameProject - название протокола;
 *      directorProject - создатель протокола;
 *      descriptionProject - описание протокола;
 *      dateCreateProject - дата создания протокола.
 */
export interface IProject {
  id: string;
  nameProject: string;
  directorProject: string;
  descriptionProject: string;
  dateCreateProject: Date;
}
