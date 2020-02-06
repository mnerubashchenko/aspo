import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class RoleService {
    roles: IRoles[];
    subject = new Subject<IRoles[]>();
    headers: HttpHeaders;
  constructor(public http: HttpClient, @Inject('BASE_URL') public baseUrl: string ) {
    this.headers = new HttpHeaders().set('content-type', 'application/json');
  }

  getRoles() {
    this.http.get<any>(this.baseUrl + 'Roles/GetRole').subscribe(result => {
        this.roles = result as IRoles[];
        this.subject.next(this.roles);
    }, error => console.error(error));
    }

  createRole(role: IRoles) {
    return this.http.post<any>(this.baseUrl + 'Roles/CreateRole', JSON.stringify(role), { headers: this.headers });
  }
}

export interface IRoles {
  IdRole: string;
  NameRole: string;
}
