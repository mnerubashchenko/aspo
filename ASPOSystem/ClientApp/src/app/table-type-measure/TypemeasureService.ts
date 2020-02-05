import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class TypemeasureService {
    typesmeasure: ITypemeasure[];
    subject = new Subject<ITypemeasure[]>();
  constructor(public http: HttpClient, @Inject('BASE_URL') public baseUrl: string ) {

  }

  getTypemeasure() {
      this.http.get<any>(this.baseUrl + 'api/Typemeasure/GetTypemeasure').subscribe(result => {
        this.typesmeasure = result as ITypemeasure[];
        this.subject.next(this.typesmeasure);
    }, error => console.error(error));
  }
}

export interface ITypemeasure {
  IdTypemeasure: string;
  NameTypemeasure: string;
}
