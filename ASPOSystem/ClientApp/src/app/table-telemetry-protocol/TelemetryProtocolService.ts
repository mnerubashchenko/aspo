import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class TelemetryProtocolService {
    links: ITelemetryProtocol[];
    subject = new Subject<ITelemetryProtocol[]>();
  headers: HttpHeaders;
  constructor(public http: HttpClient, @Inject('BASE_URL') public baseUrl: string) {
    this.headers = new HttpHeaders().set('content-type', 'application/json');
  }

  getLinks() {
    this.http.get<any>(this.baseUrl + 'TelemetryProtocol/GetLinks').subscribe(result => {
      this.links = result as ITelemetryProtocol[];
      this.subject.next(this.links);
    }, error => console.error(error));
  }
}

export interface ITelemetryProtocol {
  IdTelprot: string;
  TelemetryLink: string;
  ProtocolTelemetryLink: string;
}
