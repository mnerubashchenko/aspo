import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class TypedevService {
    typesdev: ITypedev[];
    subject = new Subject<ITypedev[]>();
    headers: HttpHeaders;
  constructor(public http: HttpClient, @Inject('BASE_URL') public baseUrl: string) {
    this.headers = new HttpHeaders().set('content-type', 'application/json');
  }

  getTypedev() {
      this.http.get<any>(this.baseUrl + 'Typedev/GetTypedev').subscribe(result => {
        this.typesdev = result as ITypedev[];
        this.subject.next(this.typesdev);
    }, error => console.error(error));
    }

  createTypedev(td: ITypedev) {
    return this.http.post<any>(this.baseUrl + 'Typedev/CreateTypedev', JSON.stringify(td), { headers: this.headers });
  }
}

export interface ITypedev {
  IdTypedev: string;
  NameTypedev: string;
}
