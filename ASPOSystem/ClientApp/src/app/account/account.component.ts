import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
    user: IUsers;
    //subject = new Subject<IUsers>();
    headers: HttpHeaders = new HttpHeaders({
        "Content-Type": "application/json"
    }) ;

    constructor(private http: HttpClient, @Inject('BASE_URL') public baseUrl: string) {
        this.http.get<IUsers>(this.baseUrl + "Users/GetUserForAccount",
            { params: new HttpParams().set("login", localStorage.getItem("login")) }).subscribe(result => {
            //let token = (<any>response).token;
            //localStorage.setItem("jwt", token);
                //this.invalidLogin = false;
                this.user = result as IUsers ;
            //this.subject.next(this.user);
            //this.router.navigate(["/"]);
            //}, err => {
            //this.invalidLogin = true;
        });
    }

    ngOnInit() {
        //let login = localStorage.getItem("login");
       
    };
}

export interface IUsers {
    IdUser: string;
    NameUser: string;
    MiddlenameUser: string;
    LastnameUser: string;
    LoginUser: string;
    PostUser: string;
    RoleUser: string;
}
