import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html'
})
export class RegistrationComponent {
  invalidLogin: boolean;

  constructor(private router: Router, private http: HttpClient) { }
 
  public login = (form: NgForm) => {
    let credentials = JSON.stringify(form.value);
    this.http.post("http://localhost:5000/Users/CreateUser", credentials, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    }).subscribe(response => {
      //let token = (<any>response).token;
      //localStorage.setItem("jwt", token);
      //this.invalidLogin = false;
      this.router.navigate(["/"]);
    //}, err => {
      //this.invalidLogin = true;
    });
  }

  isPasswordTrue() {

  }
}
