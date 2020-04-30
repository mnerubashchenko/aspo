import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class TypeinterService {
    typesinter: ITypeinter[];
    subject = new Subject<ITypeinter[]>();
    headers: HttpHeaders;
  constructor(public http: HttpClient, @Inject('BASE_URL') public baseUrl: string) {
    this.headers = new HttpHeaders().set('content-type', 'application/json');
  }

  getTypeinter(correction: string) {
    this.http.get<any>(this.baseUrl + 'Typeinter/GetTypeinter', {
      params: new HttpParams().set("correction", correction)
    }).subscribe(result => {
        this.typesinter = result as ITypeinter[];
        this.subject.next(this.typesinter);
    }, error => console.error(error));
  }

}

export interface ITypeinter {
  Id: string;
  NameTypeinter: string;
}
