import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { Router } from "@angular/router";
import { NgForm } from '@angular/forms';
import notify from 'devextreme/ui/notify';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  checkPass: boolean = true;
  checkLogin: boolean = true;
  loginPattern: any = new RegExp(/^[A-Za-z0-9]+$/);

   constructor(private router: Router, private http: HttpClient, @Inject('BASE_URL') public baseUrl: string) {
       this.baseUrl = baseUrl;
  }

 
  public registration = (form: NgForm) => {
    this.checkPass = (form.controls.passwordUser.value == form.controls.passwordConfirm.value) ? true : false;
    this.checkLogin = form.controls.loginUser.value.match(this.loginPattern);
    let credentials = JSON.stringify(form.value);
    if (!this.checkLogin) {
      notify({
        message: "Логин может состоять только из латинских букв и цифр", width: 300, shading: false,
        position: { my: 'top', at: 'top', of: window, offset: '0 10' },
        animation: {
          show: { duration: 300, type: "slide", from: { top: -50 } },
          hide: { duration: 300, type: "slide", to: { top: -50 } }
        }
      }, "error", 1000);
    }
    else if (this.checkPass) {
      this.http.post(this.baseUrl + "Users/CreateUser", credentials, {
        headers: new HttpHeaders({
          "Content-Type": "application/json"
        })
      }).subscribe(response => {
        this.router.navigate(["login"]);
      }, err => {
        notify({
          message: err.error, width: 300, shading: false,
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
