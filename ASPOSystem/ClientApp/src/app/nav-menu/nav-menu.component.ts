/* Компонент меню навигации.
 * Название: NavMenuComponent.
 * Язык: TypeScript.
 * Краткое описание:
 *    Данный компонент является главным меню приложения.
 * Переменная, используемая в компоненте:
 *    isExpanded - переменная для правильного отображения стилей.
 * Методы, используемые в компоненте:
 *    collapse() - правильное отображение стилей;
 *    toggle() - правильное отображение стилей;
 *    isUserAuthenticated() - проверка, авторизирован ли пользователь;
 *    getLogin() - проверка, под каким логином пользователь авторизирован;
 *    isUserAdmin() - проверка, является ли пользователь администратором;
 *    logOut() - выход из учетной записи.
 */

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent{

  /* Конструктор компонента NavMenuComponent.
   * Переменные, используемые в конструкторе:
   *      jwtHelper - переменная для работы с JWT токенами;
   *      router - переменная, отвечающая за маршрутизацию.
   */
    constructor(private jwtHelper: JwtHelperService, private router: Router) {}

  isExpanded = false;

  /* collapse() - правильное отображение стилей. */
  collapse() {
    this.isExpanded = false;
  }

  /* toggle() - правильное отображение стилей. */
  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  /* isUserAuthenticated() - проверка, авторизирован ли пользователь.
   * Используемая переменная:
   *      token - JWT токен.
   */
  isUserAuthenticated() {
    let token: string = localStorage.getItem("jwt");
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    }
    else {
      return false;
    }
  }

  /* getLogin() - проверка, под каким логином пользователь авторизирован. */
    getLogin() {
        if (this.isUserAuthenticated()) {
            return localStorage.getItem("login");
        }
    }

    /* isUserAdmin() - проверка, является ли пользователь администратором. */
  isUserAdmin() {
    if (localStorage.getItem('role') == 'Администратор') {
      return true;
    }
    else {
      return false;
    }
  }

  /* logOut() - выход из учетной записи. */
  public logOut = () => {
      localStorage.removeItem("jwt");
    localStorage.removeItem("login");
    localStorage.removeItem("role");
      this.router.navigate(["/"]);
  }

}
