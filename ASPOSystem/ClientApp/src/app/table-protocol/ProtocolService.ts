import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ProtocolService {
    protocols: IProtocol[];
    subject = new Subject<IProtocol[]>();
  headers: HttpHeaders;
  constructor(public http: HttpClient, @Inject('BASE_URL') public baseUrl: string) {
    this.headers = new HttpHeaders().set('content-type', 'application/json');
  }

  getProtocols() {
    this.http.get<any>(this.baseUrl + 'Protocol/GetProtocols').subscribe(result => {
        this.protocols = result as IProtocol[];
        this.subject.next(this.protocols);
    }, error => console.error(error));
  }
}

export interface IProtocol {
  IdProtocol: string;
  NameProtocol: string;
  DateCreateProtocol: Date;
}
