import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class CommentsService {
    comments: IComments[];
    subject = new Subject<IComments[]>();
  headers: HttpHeaders;
  constructor(public http: HttpClient, @Inject('BASE_URL') public baseUrl: string ) {
    this.headers = new HttpHeaders().set('content-type', 'application/json');
  }

  getComments() {
    this.http.get<any>(this.baseUrl + 'Comments/GetComments').subscribe(result => {
        this.comments = result as IComments[];
        this.subject.next(this.comments);
    }, error => console.error(error));
  }

}

export interface IComments {
  IdComment: string;
  TextComment: string;
  ProtocolComment: string;
  AuthorComment: string;
  DateTimeComment: Date;
}
