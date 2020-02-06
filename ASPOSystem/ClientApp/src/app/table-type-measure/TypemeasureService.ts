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

  createTypemeasure(tm: ITypemeasure) {
    return this.http.post<any>(this.baseUrl + 'Typemeasure/CreateTypemeasure', JSON.stringify(tm), { headers: this.headers });
  }
}

export interface ITypemeasure {
  IdTypemeasure: string;
  NameTypemeasure: string;
}
