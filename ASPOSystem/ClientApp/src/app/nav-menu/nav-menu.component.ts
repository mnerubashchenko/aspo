import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Local } from 'protractor/built/driverProviders';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent{

    constructor(private jwtHelper: JwtHelperService, private router: Router) {}

  isExpanded = false;

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
    }

  isUserAuthenticated() {
    let token: string = localStorage.getItem("jwt");
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    }
    else {
      return false;
    }
    }

    getLogin() {
        if (this.isUserAuthenticated()) {
            return localStorage.getItem("login");
        }
  }

  isUserAdmin() {
    if (localStorage.getItem('role') == 'Администратор') {
      return true;
    }
    else {
      return false;
    }
  }

  public logOut = () => {
      localStorage.removeItem("jwt");
    localStorage.removeItem("login");
    localStorage.removeItem("role");
      this.router.navigate(["/"]);
  }

}
