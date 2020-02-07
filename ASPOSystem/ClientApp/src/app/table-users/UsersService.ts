import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class UsersService {
    users: IUsers[];
    subject = new Subject<IUsers[]>();
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
