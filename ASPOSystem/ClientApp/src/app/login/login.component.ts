/* Компонент формы авторизации.
 * Название: LoginComponent.
 * Язык: TypeScript.
 * Краткое описание:
 *    Данный компонент является формой авторизации в приложении.
 * Метод, используемый в компоненте:
 *    login() - отправка введенных данных на сервер для авторизации и аутентификации.
 */

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { Router } from "@angular/router";
import { NgForm } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import notify from 'devextreme/ui/notify';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  /* Конструктор компонента LoginComponent.
   * Переменные, используемые в конструкторе:
   *      router - переменная, отвечающая за маршрутизацию;
   *      http - HTTP клиент;
   *      baseUrl - базовый URL адрес;
   *      jwtHelper - переменная для работы с JWT токенами.
   */
    constructor(private router: Router, private http: HttpClient, @Inject('BASE_URL') public baseUrl: string, private jwtHelper: JwtHelperService) {
        this.baseUrl = baseUrl;
    }

   /* login() - отправка введенных данных на сервер для авторизации и аутентификации.
    * Формальный параметр:
    *      form - данные, введенные пользователем.
    * Локальные переменные:
    *      credentials - десериализованные данные, введенные пользователем;
    *      token - сгенерированный закодированный JWT токен;
    *      userLogin - декодированный JWT токен, содержащий информацию о пользователе.
    */
  public login = (form: NgForm) => {
      let credentials = JSON.stringify(form.value);
      this.http.post(this.baseUrl + "api/auth/login", credentials, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    }).subscribe(response => {
      let token = (<any>response).token;
        localStorage.setItem("jwt", token);
        let userLogin = this.jwtHelper.decodeToken(localStorage.getItem("jwt"));
      localStorage.setItem("login", userLogin['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']);
      localStorage.setItem("role", userLogin['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']);
      this.http.get<any>(this.baseUrl + "Users/GetIdOfAuthorizedUser", {
        params: new HttpParams().set("login", localStorage.getItem("login"))
      }).subscribe(result => {
        localStorage.setItem("idOfUser", result);
      });
      this.router.navigate(["/"]);
    }, err => {
        notify({
          message: "Неверный логин или пароль", width: 300, shading: false,
          position: { my: 'top', at: 'top', of: window, offset: '0 10' },
          animation: {
            show: { duration: 300, type: "slide", from: { top: -50 } },
            hide: { duration: 300, type: "slide", to: { top: -50 } }
          }
        }, "error", 1000);
    });
  }
}
