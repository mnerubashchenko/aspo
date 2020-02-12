import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ProjectService {
  projects: IProject[];
  subject = new Subject<IProject[]>();
  headers: HttpHeaders;
  constructor(public http: HttpClient, @Inject('BASE_URL') public baseUrl: string) {
    this.headers = new HttpHeaders().set('content-type', 'application/json');
  }

  getProjects() {
    this.http.get<any>(this.baseUrl + 'Projects/GetProjects').subscribe(result => {
        this.projects = result as IProject[];
        this.subject.next(this.projects);
    }, error => console.error(error));
  }
}

export interface IProject {
  IdProject: string;
  NameProject: string;
  DirectorProject: string;
  CategoryProject: string;
  DescriptionProject: string;
  DateCreateProject: Date;
}
