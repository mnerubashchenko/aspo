import { Component, OnInit, Inject } from '@angular/core';
import { Router } from "@angular/router";
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import notify from 'devextreme/ui/notify';

@Component({
  selector: 'app-password-changer',
  templateUrl: './password-changer.component.html',
  styleUrls: ['./password-changer.component.css']
})
export class PasswordChangerComponent implements OnInit {
    password: string = "";
    check: boolean = true;
    constructor(private router: Router, private http: HttpClient, @Inject('BASE_URL') public baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    public passChange = (form: NgForm) => {

        var params = new HttpParams()
            .set('login', localStorage.getItem("login"))
            .set('oldPassword', form.controls.oldPassword.value)
            .set('newPassword', form.controls.passwordUser.value);

        this.http.put(this.baseUrl + "Users/PasswordChanger", {
            headers: new HttpHeaders({ "Content-Type": "application/json" })
        }, { params })
            .subscribe(response => {
              this.router.navigate(["account"]);
            }, error => {
                notify({
                  message: error.error, width: 300, shading: false,
                  position: { my: 'top', at: 'top', of: window, offset: '0 10' },
                  animation: {
                    show: { duration: 300, type: "slide", from: { top: -50 } },
                    hide: { duration: 300, type: "slide", to: { top: -50 } }
                  }
                }, "error", 1000);
            });
  }

  passwordComparison = () => {
    return this.password;
  }

  ngOnInit() {
  }

}
