import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ProjectTelemetryService {
  links: IProjectTelemetry[];
  subject = new Subject<IProjectTelemetry[]>();
  headers: HttpHeaders;
  constructor(public http: HttpClient, @Inject('BASE_URL') public baseUrl: string) {
    this.headers = new HttpHeaders().set('content-type', 'application/json');
  }

  getLinks() {
    this.http.get<any>(this.baseUrl + 'ProjectTelemetry/GetLinks').subscribe(result => {
      this.links = result as IProjectTelemetry[];
      this.subject.next(this.links);
    }, error => console.error(error));
  }
}

export interface IProjectTelemetry {
  Id: string;
  IdProject: string;
  IdTelemetry: string;
}
