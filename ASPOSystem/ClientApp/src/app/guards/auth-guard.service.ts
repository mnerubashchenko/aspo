/* Ограничитель маршрутизации.
 * Название: AuthGuard.
 * Язык: TypeScript.
 * Краткое описание:
 *    Данный огрничитель маршрутизации не позволяет активировать страницу, пока пользователь не авторизирован.
 * Метод, используемый в сервисе:
 *    canActivate() - проверка, авторизирован ли пользователь.
 */

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthGuard implements CanActivate {

  /* Конструктор ограничителя маршрутизации AuthGuard.
   * Переменные, используемые в конструкторе:
   *      jwtHelper - управление JWT токенами;
   *      router - переменная, отвечающая за маршрутизацию.
   */
  constructor(private jwtHelper: JwtHelperService, private router: Router) {
  }

  /* canActivate() - проверка, авторизирован ли пользователь.
   * Локальная переменная:
   *      token - JWT токен пользователя.
   */
  canActivate() {
    var token = localStorage.getItem("jwt");
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    }
    this.router.navigate(["login"]);
    return false;
  }

}
