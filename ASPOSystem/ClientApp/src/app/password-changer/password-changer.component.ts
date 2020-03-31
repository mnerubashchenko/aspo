import { Component, OnInit, Inject } from '@angular/core';
import { Router } from "@angular/router";
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-password-changer',
  templateUrl: './password-changer.component.html',
  styleUrls: ['./password-changer.component.css']
})
export class PasswordChangerComponent implements OnInit {
    check: boolean = true;
    flagOfError: boolean;
    textOfError: string;
    constructor(private router: Router, private http: HttpClient, @Inject('BASE_URL') public baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    public passChange = (form: NgForm) => {
        this.check = (form.controls.passwordUser.value == form.controls.passwordConfirm.value) ? true : false;

        var params = new HttpParams()
            .set('login', localStorage.getItem("login"))
            .set('oldPassword', form.controls.oldPassword.value)
            .set('newPassword', form.controls.passwordUser.value);

        if (this.check) {
        this.http.put(this.baseUrl + "Users/PasswordChanger", {
            headers: new HttpHeaders({ "Content-Type": "application/json" })
        }, { params })
            .subscribe(response => {
              this.router.navigate(["account"]);
              this.flagOfError = false;
            }, error => {
              this.flagOfError = true; this.textOfError = error.error;
            });
        }
    }

  ngOnInit() {
  }

}
