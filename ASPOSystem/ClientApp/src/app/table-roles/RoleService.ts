import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class RoleService {
    roles: IRoles[];
    subject = new Subject<IRoles[]>();
  constructor(public http: HttpClient, @Inject('BASE_URL') public baseUrl: string) {

  }

  getRoles() {
    this.http.get<any>(this.baseUrl + 'api/Roles/GetRole').subscribe(result => {
        this.roles = result as IRoles[];
        this.subject.next(this.roles);
    }, error => console.error(error));
  }
}

export interface IRoles {
  IdRole: string;
  NameRole: string;
}
