import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class TypemeasureService {
    typesmeasure: ITypemeasure[];
  subject = new Subject<ITypemeasure[]>();
  headers: HttpHeaders;
  constructor(public http: HttpClient, @Inject('BASE_URL') public baseUrl: string ) {
    this.headers = new HttpHeaders().set('content-type', 'application/json');
  }

  getTypemeasure(correction: string) {
    this.http.get<any>(this.baseUrl + 'Typemeasure/GetTypemeasure', {
      params: new HttpParams().set("correction", correction)
    }).subscribe(result => {
        this.typesmeasure = result as ITypemeasure[];
        this.subject.next(this.typesmeasure);
    }, error => console.error(error));
  }

}

export interface ITypemeasure {
  id: string;
  nameTypemeasure: string;
}
