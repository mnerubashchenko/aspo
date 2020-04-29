import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { Router } from "@angular/router";
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  check: boolean;
  invalidLogin: boolean;
  textError: string;
  isPopupSuccessVisible: boolean = false;
  popupSuccessTitle: string;
  popupSuccessText: string;

   constructor(private router: Router, private http: HttpClient, @Inject('BASE_URL') public baseUrl: string) {
       this.check = true;
       this.baseUrl = baseUrl;
  }

  public route() {
    this.router.navigate(["login"]);
  }
 
  public registration = (form: NgForm) => {
      this.invalidLogin = false;
      this.check = (form.controls.passwordUser.value == form.controls.passwordConfirm.value) ? true : false;
      let credentials = JSON.stringify(form.value);

        if (this.check) {
            this.http.post(this.baseUrl + "Users/CreateUser", credentials, {
            headers: new HttpHeaders({
              "Content-Type": "application/json"
            })
          }).subscribe(response => {
            this.isPopupSuccessVisible = true;
            this.popupSuccessTitle = "Успешно!";
            this.popupSuccessText = "Регистрация завершена!";
            this.invalidLogin = false;
          }, err => {
            this.invalidLogin = true;
            this.textError = err.error;
          });
        }
    }
}
