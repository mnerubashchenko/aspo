import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class PostService {
    posts: IPosts[];
    subject = new Subject<IPosts[]>();
    headers: HttpHeaders;
    constructor(public http: HttpClient, @Inject('BASE_URL') public baseUrl: string ) {
      this.headers = new HttpHeaders().set('content-type', 'application/json');
    }

    getPosts(correction: string) {
      this.http.get<any>(this.baseUrl + 'Posts/GetPost', {
        params: new HttpParams().set("correction", correction)
      }).subscribe(result => {
          this.posts = result as IPosts[];
          this.subject.next(this.posts);
      }, error => console.error(error));
    }
}

export interface IPosts {
  Id: string;
  NamePost: string;
}
