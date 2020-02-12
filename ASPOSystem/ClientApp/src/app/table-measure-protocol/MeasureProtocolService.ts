import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class MeasureProtocolService {
    links: IMeasureProtocol[];
    subject = new Subject<IMeasureProtocol[]>();
  headers: HttpHeaders;
  constructor(public http: HttpClient, @Inject('BASE_URL') public baseUrl: string) {
    this.headers = new HttpHeaders().set('content-type', 'application/json');
  }

  getLinks() {
    this.http.get<any>(this.baseUrl + 'MeasureProtocol/GetLinks').subscribe(result => {
        this.links = result as IMeasureProtocol[];
      this.subject.next(this.links);
    }, error => console.error(error));
  }
}

export interface IMeasureProtocol {
  IdMeasprot: string;
  MeasureLink: string;
  ProtocolMeasureLink: string;
}
