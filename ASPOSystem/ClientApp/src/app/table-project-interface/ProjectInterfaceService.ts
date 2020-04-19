import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ProjectInterfaceService {
  links: IProjectInterface[];
  subject = new Subject<IProjectInterface[]>();
    headers: HttpHeaders;
    constructor(public http: HttpClient, @Inject('BASE_URL') public baseUrl: string) {
        this.headers = new HttpHeaders().set('content-type', 'application/json');
    }

    getLinks() {
        this.http.get<any>(this.baseUrl + 'ProjectInterface/GetLinks').subscribe(result => {
          this.links = result as IProjectInterface[];
            this.subject.next(this.links);
        }, error => console.error(error));
    }
}

export interface IProjectInterface {
    Id: string;
    IdProject: string;
    IdInterface: string;
}
