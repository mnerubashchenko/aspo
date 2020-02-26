import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { Router } from "@angular/router";
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html'
})
export class RegistrationComponent {
  check: boolean;

   constructor(private router: Router, private http: HttpClient, @Inject('BASE_URL') public baseUrl: string) {
       this.check = true;
       this.baseUrl = baseUrl;
   }
 
    public registration = (form: NgForm) => {
      this.check = (form.controls.passwordUser.value == form.controls.passwordConfirm.value) ? true : false;
      let credentials = JSON.stringify(form.value);

        if (this.check) {
            this.http.post(this.baseUrl + "Users/CreateUser", credentials, {
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
    }
}
