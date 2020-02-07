import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class TypeinterService {
    typesinter: ITypeinter[];
    subject = new Subject<ITypeinter[]>();
    headers: HttpHeaders;
  constructor(public http: HttpClient, @Inject('BASE_URL') public baseUrl: string) {
    this.headers = new HttpHeaders().set('content-type', 'application/json');
  }

  getTypeinter() {
      this.http.get<any>(this.baseUrl + 'Typeinter/GetTypeinter').subscribe(result => {
        this.typesinter = result as ITypeinter[];
        this.subject.next(this.typesinter);
    }, error => console.error(error));
  }

}

export interface ITypeinter {
  IdTypeinter: string;
  NameTypeinter: string;
}
