import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ProjectDeviceService {
  links: IProjectDevice[];
  subject = new Subject<IProjectDevice[]>();
    headers: HttpHeaders;
    constructor(public http: HttpClient, @Inject('BASE_URL') public baseUrl: string) {
        this.headers = new HttpHeaders().set('content-type', 'application/json');
    }

    getLinks() {
        this.http.get<any>(this.baseUrl + 'ProjectDevice/GetLinks').subscribe(result => {
          this.links = result as IProjectDevice[];
            this.subject.next(this.links);
        }, error => console.error(error));
    }
}

export interface IProjectDevice {
    Id: string;
    IdProject: string;
    IdDevice: string;
}
