import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class CommandsProtocolService {
    links: ICommandsProtocol[];
    subject = new Subject<ICommandsProtocol[]>();
  headers: HttpHeaders;
  constructor(public http: HttpClient, @Inject('BASE_URL') public baseUrl: string) {
    this.headers = new HttpHeaders().set('content-type', 'application/json');
  }

  getLinks() {
    this.http.get<any>(this.baseUrl + 'CommandsProtocol/GetLinks').subscribe(result => {
        this.links = result as ICommandsProtocol[];
      this.subject.next(this.links);
    }, error => console.error(error));
  }
}

export interface ICommandsProtocol {
  IdPrcprot: string;
  CommandLink: string;
  ProtocolCommandLink: string;
}
