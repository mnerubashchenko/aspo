import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { Router } from "@angular/router";
import { NgForm } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
    invalidLogin: boolean;

    constructor(private router: Router, private http: HttpClient, @Inject('BASE_URL') public baseUrl: string, private jwtHelper: JwtHelperService) {
        this.baseUrl = baseUrl;
    }
  
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
      this.http.get<any>(this.baseUrl + "Users/GetIdOfAuthorizedUser", {
        params: new HttpParams().set("login", localStorage.getItem("login"))
      }).subscribe(result => {
        localStorage.setItem("idOfUser", result);
      });
      this.invalidLogin = false;
      this.router.navigate(["/"]);
    }, err => {
      this.invalidLogin = true;
    });
  }
}
