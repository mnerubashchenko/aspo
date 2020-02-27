import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

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
            let userLogin = this.jwtHelper.decodeToken(localStorage.getItem("jwt"));
            localStorage.setItem("login", userLogin['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']);
            return localStorage.getItem("login");
        }
    }

  public logOut = () => {
      localStorage.removeItem("jwt");
      this.router.navigate(["/"]);
  }

}
