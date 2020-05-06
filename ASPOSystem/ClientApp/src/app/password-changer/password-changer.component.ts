/* Компонент формы смены пароля.
 * Название: PasswordChangerComponent.
 * Язык: TypeScript.
 * Краткое описание:
 *    Данный компонент является формой смены пароля.
 * Переменная, используемая в компоненте:
 *    check - флаг для проверки совпадения введенного нового пароля и его подтверждения.
 * Методы, используемые в компоненте:
 *    passChange() - смена пароля.
 */

import { Component, Inject } from '@angular/core';
import { Router } from "@angular/router";
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import notify from 'devextreme/ui/notify';

@Component({
  selector: 'app-password-changer',
  templateUrl: './password-changer.component.html',
  styleUrls: ['./password-changer.component.css']
})
export class PasswordChangerComponent {
  check: boolean = true;

  /* Конструктор компонента PasswordChangerComponent.
   * Переменные, используемые в конструкторе:
   *      router - переменная, отвечающая за маршрутизацию;
   *      http - HTTP клиент;
   *      baseUrl - базовый URL адрес.
   */
    constructor(private router: Router, private http: HttpClient, @Inject('BASE_URL') public baseUrl: string) {
        this.baseUrl = baseUrl;
    }

  /* passChange() - смена пароля.
   * Формальный параметр:
   *      form - данные с формы смены пароля.
   * Локальная переменная:
   *      params - HTTP параметры для передачи данных на сервер.
   */
    public passChange = (form: NgForm) => {
      this.check = (form.controls.passwordUser.value == form.controls.passwordConfirm.value) ? true : false;
        var params = new HttpParams()
            .set('login', localStorage.getItem("login"))
            .set('oldPassword', form.controls.oldPassword.value)
            .set('newPassword', form.controls.passwordUser.value);

      if (this.check) {
        this.http.put(this.baseUrl + "Users/PasswordChanger", {
          headers: new HttpHeaders({ "Content-Type": "application/json" })
        }, { params })
          .subscribe(response => {
            this.router.navigate(["account"]);
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

      else {
        notify({
          message: "Пароли не совпадают", width: 300, shading: false,
          position: { my: 'top', at: 'top', of: window, offset: '0 10' },
          animation: {
            show: { duration: 300, type: "slide", from: { top: -50 } },
            hide: { duration: 300, type: "slide", to: { top: -50 } }
          }
        }, "error", 1000);
      }
    }
}
