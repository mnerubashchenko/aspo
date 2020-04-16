import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ProjectMeasureService {
    links: IProjectMeasure[];
    subject = new Subject<IProjectMeasure[]>();
    headers: HttpHeaders;
    constructor(public http: HttpClient, @Inject('BASE_URL') public baseUrl: string) {
        this.headers = new HttpHeaders().set('content-type', 'application/json');
    }

    getLinks() {
        this.http.get<any>(this.baseUrl + 'ProjectMeasure/GetLinks').subscribe(result => {
            this.links = result as IProjectMeasure[];
            this.subject.next(this.links);
        }, error => console.error(error));
    }
}

export interface IProjectMeasure {
    Id: string;
    IdProject: string;
    IdMeasure: string;
}
