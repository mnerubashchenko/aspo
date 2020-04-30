import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class TypedevService {
    typesdev: ITypedev[];
    subject = new Subject<ITypedev[]>();
    headers: HttpHeaders;
  constructor(public http: HttpClient, @Inject('BASE_URL') public baseUrl: string) {
    this.headers = new HttpHeaders().set('content-type', 'application/json');
  }

  getTypedev(correction: string) {
    this.http.get<any>(this.baseUrl + 'Typedev/GetTypedev', {
      params: new HttpParams().set("correction", correction)
    }).subscribe(result => {
        this.typesdev = result as ITypedev[];
        this.subject.next(this.typesdev);
    }, error => console.error(error));
    }

}

export interface ITypedev {
  Id: string;
  NameTypedev: string;
}
