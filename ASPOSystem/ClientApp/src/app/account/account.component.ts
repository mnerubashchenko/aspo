import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import { UsersService } from '../table-users/UsersService';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
    public user: IUsers;
    headers: HttpHeaders = new HttpHeaders({
        "Content-Type": "application/json"
    }) ;

  constructor(private usersService: UsersService, private http: HttpClient, @Inject('BASE_URL') public baseUrl: string) {
    this.usersService.subjectAuth.subscribe(this.userAccountReceived);
    this.usersService.getUserForAccount();
  }

  ngOnInit() {
  }

  userAccountReceived = (data: IUsers) => {
      this.user = data;
    }
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
