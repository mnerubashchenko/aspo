import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class MeasureService {
    measures: IMeasure[];
    subject = new Subject<IMeasure[]>();
  headers: HttpHeaders;
  constructor(public http: HttpClient, @Inject('BASE_URL') public baseUrl: string) {
    this.headers = new HttpHeaders().set('content-type', 'application/json');
  }

  getMeasures() {
    this.http.get<any>(this.baseUrl + 'Measure/GetMeasures').subscribe(result => {
        this.measures = result as IMeasure[];
        this.subject.next(this.measures);
    }, error => console.error(error));
  }
}

export interface IMeasure {
  IdMeasure: string;
  GroupMeasure: string;
  NameMeasure: string;
  IsCheckMeasure: string;
  StatusMeasure: string;
  ManualMeasure: string;
  InterfaceMeasure: string;
  DateCreateMeasure: Date;
}