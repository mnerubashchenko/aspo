import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ProjectProtocolService {
    links: IProjectProtocol[];
    subject = new Subject<IProjectProtocol[]>();
  headers: HttpHeaders;
  constructor(public http: HttpClient, @Inject('BASE_URL') public baseUrl: string) {
    this.headers = new HttpHeaders().set('content-type', 'application/json');
  }

  getProjProtLinks() {
    this.http.get<any>(this.baseUrl + 'ProjectProtocol/GetProjProtLinks').subscribe(result => {
        this.links = result as IProjectProtocol[];
        this.subject.next(this.links);
    }, error => console.error(error));
  }
}

export interface IProjectProtocol {
  IdProjprot: string;
  ProjectLink: string;
  ProtocolProjectLink: string;
}
