/* Компонент личного кабинета пользователя.
 * Название: AccountComponent.
 * Язык: TypeScript.
 * Краткое описание:
 *    Данный компонент является личным кабинетом пользователя.
 * Переменные, используемые в компоненте:
 *    form - данные с формы личного кабинета;
 *    dataGrid - таблица, содержащая проекты, создателем которых является пользователь;
 *    roles - роли пользователей;
 *    posts - должности пользователей;
 *    projects - проекты, создателем которых является пользователь;
 *    user - данные пользователя;
 *    flagForReadOnly - флаг, отвечающий за возможность редактирования данных на форме;
 *    flagForChangeButtons - флаг, отвечающий за отображение нужных кнопок в личном кабинете;
 *    store - логика отправки данных о протоколах на сервер;
 *    loginPattern - правило, которому должен соответствовать логин пользователя при редактировании;
 *    headers - HTTP заголовки для формирования HTTP запроса.
 * Методы, используемые в компоненте:
 *    userAccountReceived() - получение данных из сервиса UsersService;
 *    projectReceived() - получение данных из сервиса ProjectService;
 *    onRowUpdating() - формирование набора данных о протоколах после редактирования для отправки на сервер;
 *    asyncValidation() - проверка валидности данных при изменении информации о протоколе;
 *    buttonIsPressed() - переход в режим редактирования данных пользователя;
 *    isChanged() - проверка состояния режима личного кабинета;
 *    cancel() - выход из режима редактирования данных пользователя;
 *    account() - отправка отредактированных данных на сервер.
 */

import { Component, Inject, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import CustomStore from "devextreme/data/custom_store";
import { IUsers, UsersService } from '../table-users/UsersService';
import { IRoles } from '../table-roles/RoleService';
import { IPosts } from '../table-posts/PostService';
import { IProject, ProjectService } from '../table-projects/ProjectService';
import { NgForm } from '@angular/forms';
import { DxDataGridComponent } from 'devextreme-angular';
import { Observable } from 'rxjs';
import notify from 'devextreme/ui/notify';

@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.css']
})
export class AccountComponent {
    @ViewChild('accountForm') form: NgForm;
    @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;
    public roles: IRoles[];
    public posts: IPosts[];
    public projects: IProject[];
    public user: IUsers[] = [{ id: '', nameUser: '', middlenameUser: '', lastnameUser: '', loginUser: '', passwordUser: '', roleUser: '', postUser: '' }];
    public flagForReadOnly: boolean = true;
    public flagForChangeButtons: boolean = false;
    store: any;
    loginPattern: any = /^[A-Za-z0-9]+$/;
    headers: HttpHeaders = new HttpHeaders({
        "Content-Type": "application/json"
    });

  /* Конструктор компонента AccountComponent.
   * Переменные, используемые в конструкторе:
   *      usersService - экземпляр сервиса UsersService;
   *      projectService - экземпляр сервиса ProjectService;
   *      http - HTTP клиент;
   *      baseUrl - базовый URL адрес.
   */
    constructor(private usersService: UsersService, private projectService: ProjectService,
      private http: HttpClient, @Inject('BASE_URL') public baseUrl: string) {
      this.asyncValidation = this.asyncValidation.bind(this);
        Observable.forkJoin(
            this.http.get<any>(this.baseUrl + "Users/GetUserForAccount", {
                params: new HttpParams().set("login", localStorage.getItem("login"))
            }),
            this.http.get<any>(this.baseUrl + 'Roles/GetRole', { params: new HttpParams().set("correction", "full") }),
            this.http.get<any>(this.baseUrl + 'Posts/GetPost', { params: new HttpParams().set("correction", "full") }),
            this.http.get<any>(this.baseUrl + "Projects/GetPersonalProjects", {
                params: new HttpParams().set("author", localStorage.getItem("login"))
            }),
        ).subscribe(([res1, res2, res3, res4]) => {
            this.user = res1;
            this.roles = res2;
            this.posts = res3;
            this.projects = res4;
        });

        this.projectService.subject.subscribe(this.projectReceived);
        this.projectService.getPersonalProjects();

        this.headers = new HttpHeaders().set('content-type', 'application/json');
        setTimeout(() => {
            this.store = new CustomStore({
                key: "id",
                load: () => this.projects,
                update: (key, values) =>
                    this.http.put<any>(this.baseUrl + 'Projects/UpdateProject', JSON.stringify(values as IProject), { headers: this.headers }).subscribe(
                        () => { this.projectService.getPersonalProjects(); }),
                remove: (key) => this.http.delete<any>(this.baseUrl + 'Projects/DeleteProject', { params: new HttpParams().set('idProject', key) }).subscribe(() => { this.projectService.getPersonalProjects(); })
            });
        }, 1000);
    }

   /* userAccountReceived() - получение данных о пользователе из сервиса UsersService.
    * Формальный параметр:
    *      data - данные, пришедшие из сервиса UsersService.
    */
    userAccountReceived = (data: IUsers[]) => {
        this.user = data;
    }

   /* projectReceived() - получение данных о проектах пользователя из сервиса ProjectService.
    * Формальный параметр:
    *      data3 - данные, пришедшие из сервиса ProjectService.
    */
    projectReceived = (data3: IProject[]) => {
        this.projects = data3;
        this.dataGrid.instance.refresh();
    }

   /* onRowUpdating() - формирование набора данных о проектах после редактирования для отправки на сервер.
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

   /* asyncValidation() - проверка валидности данных при изменении информации о проекте.
    * Формальный параметр:
    *      params - значение, которое валидируется.
    * Локальные переменные:
    *      cleanProjectValidate - набор проектов, после удаления изменяемого проекта;
    *      check - флаг, определяющий, уникально ли входное значение.
    */
  asyncValidation(params) {
    let cleanProjectValidate = this.projects.filter(item => item.id != params.data.id);
    let check = (cleanProjectValidate.find(item => item.nameProject.toLowerCase() == params.value.toLowerCase()) != null) ? false : true;
    return new Promise((resolve) => {
      resolve(check === true);
    });
  }

    /* buttonIsPressed() - переход в режим редактирования данных пользователя. */
    private buttonIsPressed() {
        this.flagForReadOnly = !this.flagForReadOnly;
        this.flagForChangeButtons = true;
    }

    /* isChanged() - проверка состояния режима личного кабинета. */
    private isChanged() {
        return this.flagForReadOnly;
    }

    /* cancel() - выход из режима редактирования данных пользователя. */
    private cancel() {
        this.usersService.subject.subscribe(this.userAccountReceived);
        this.usersService.getUserForAccount();
        this.form.resetForm(this.user[0]);
        this.flagForReadOnly = !this.flagForReadOnly;
        this.flagForChangeButtons = false;
    }

   /* account() - проверка валидности данных при изменении информации о проекте.
    * Формальный параметр:
    *      form - данные с формы.
    */
  public account = (form: NgForm) => {
    if (form.controls.middlenameUser.value == this.user[0].middlenameUser
      && form.controls.nameUser.value == this.user[0].nameUser
      && form.controls.lastnameUser.value == this.user[0].lastnameUser
      && form.controls.loginUser.value == this.user[0].loginUser
      && form.controls.roleUser.value == this.user[0].roleUser
      && form.controls.postUser.value == this.user[0].postUser) {
      notify({
        message: "Вы не произвели никаких изменений", width: 300, shading: false,
        position: { my: 'top', at: 'top', of: window, offset: '0 10' },
        animation: {
          show: { duration: 300, type: "slide", from: { top: -50 } },
          hide: { duration: 300, type: "slide", to: { top: -50 } }
        }
      }, "warning", 1000);
    }

    else {
      this.http.put<any>(this.baseUrl + "Users/UpdateUser", JSON.stringify(form.value as IUsers), {
        headers: new HttpHeaders({
          "Content-Type": "application/json"
        })
      }).subscribe(res => {
        notify({
          message: "Профиль отредактирован!", width: 300, shading: false,
          position: { my: 'top', at: 'top', of: window, offset: '0 10' },
          animation: {
            show: { duration: 300, type: "slide", from: { top: -50 } },
            hide: { duration: 300, type: "slide", to: { top: -50 } }
          }
        }, "success", 1000);
        this.flagForChangeButtons = false;
        this.flagForReadOnly = !this.flagForReadOnly;
        localStorage.removeItem("login");
        localStorage.setItem("login", form.controls.loginUser.value);
        this.usersService.subject.subscribe(this.userAccountReceived);
        this.usersService.getUserForAccount();
        }, error => {
          notify({
            message: error.error, width: 300, shading: false,
            position: { my: 'top', at: 'top', of: window, offset: '0 10' },
            animation: {
              show: { duration: 300, type: "slide", from: { top: -50 } },
              hide: { duration: 300, type: "slide", to: { top: -50 } }
            }
          }, "error", 1000);
      });
    }
  }
}
