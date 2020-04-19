import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ProjectCommandService {
  links: IProjectCommand[];
  subject = new Subject<IProjectCommand[]>();
  headers: HttpHeaders;
  constructor(public http: HttpClient, @Inject('BASE_URL') public baseUrl: string) {
    this.headers = new HttpHeaders().set('content-type', 'application/json');
  }

  getLinks() {
    this.http.get<any>(this.baseUrl + 'ProjectCommand/GetLinks').subscribe(result => {
      this.links = result as IProjectCommand[];
      this.subject.next(this.links);
    }, error => console.error(error));
  }
}

export interface IProjectCommand {
  Id: string;
  IdProject: string;
  IdCommand: string;
}
