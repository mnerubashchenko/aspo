import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class TypemeasureService {
    typesmeasure: ITypemeasure[];
  subject = new Subject<ITypemeasure[]>();
  headers: HttpHeaders;
  constructor(public http: HttpClient, @Inject('BASE_URL') public baseUrl: string ) {
    this.headers = new HttpHeaders().set('content-type', 'application/json');
  }

  getTypemeasure() {
      this.http.get<any>(this.baseUrl + 'Typemeasure/GetTypemeasure').subscribe(result => {
        this.typesmeasure = result as ITypemeasure[];
        this.subject.next(this.typesmeasure);
    }, error => console.error(error));
  }

}

export interface ITypemeasure {
  Id: string;
  NameTypemeasure: string;
}
