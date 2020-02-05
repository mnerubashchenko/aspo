import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class PostService {
    posts: IPosts[];
    subject = new Subject<IPosts[]>();
    constructor(public http: HttpClient, @Inject('BASE_URL') public baseUrl: string ) {

    }

    getPosts() {
      this.http.get<any>(this.baseUrl + 'api/Posts/GetPost').subscribe(result => {
          this.posts = result as IPosts[];
          this.subject.next(this.posts);
      }, error => console.error(error));
    }
}

export interface IPosts {
  IdPost: string;
  NamePost: string;
}
