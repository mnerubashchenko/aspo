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
  password: string = "";
  textError: string;
  isPopupSuccessVisible: boolean = false;
  popupSuccessTitle: string;
  popupSuccessText: string;
  loginPattern: any = /^[A-Za-z0-9]+$/;
   constructor(private router: Router, private http: HttpClient, @Inject('BASE_URL') public baseUrl: string) {
       this.baseUrl = baseUrl;
  }

  public route() {
    this.router.navigate(["login"]);
  }

  passwordComparison = () => {
    return this.password;
  }
 
  public registration = (form: NgForm) => {
    let credentials = JSON.stringify(form.value);
    this.http.post(this.baseUrl + "Users/CreateUser", credentials, {
    headers: new HttpHeaders({
    "Content-Type": "application/json"
    })
    }).subscribe(response => {
    this.isPopupSuccessVisible = true;
    this.popupSuccessTitle = "Успешно!";
    this.popupSuccessText = "Регистрация завершена!";
    }, err => {
    this.textError = err.error;
    });
  }
}
