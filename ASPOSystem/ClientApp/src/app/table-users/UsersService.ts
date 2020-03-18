import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class UsersService {
    users: IUsers[];
    user: IUsers[];
  subject = new Subject<IUsers[]>();
  subjectAuth = new Subject<IUsers[]>();
  headers: HttpHeaders;
  constructor(public http: HttpClient, @Inject('BASE_URL') public baseUrl: string) {
    this.headers = new HttpHeaders().set('content-type', 'application/json');
  }

  getUsers() {
    this.http.get<any>(this.baseUrl + 'Users/GetUsers').subscribe(result => {
        this.users = result as IUsers[];
        this.subject.next(this.users);
    }, error => console.error(error));
  }

  getUserForAccount() {
    this.http.get<any>(this.baseUrl + "Users/GetUserForAccount", {
      params: new HttpParams().set("login", localStorage.getItem("login"))
      }).subscribe(result => {
      this.user = result as IUsers[];
      this.subjectAuth.next(this.user);
      }, error => console.error(error));
  }
}

export interface IUsers {
    IdUser: string;
    NameUser: string;
    MiddlenameUser: string;
    LastnameUser: string;
    LoginUser: string;
    PasswordUser: string;
    PostUser: string;
    RoleUser: string;
}
