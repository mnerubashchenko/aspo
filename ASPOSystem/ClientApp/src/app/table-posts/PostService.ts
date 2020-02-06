import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class PostService {
    posts: IPosts[];
    subject = new Subject<IPosts[]>();
    headers: HttpHeaders;
    constructor(public http: HttpClient, @Inject('BASE_URL') public baseUrl: string ) {
      this.headers = new HttpHeaders().set('content-type', 'application/json');
    }

    getPosts() {
      this.http.get<any>(this.baseUrl + 'Posts/GetPost').subscribe(result => {
          this.posts = result as IPosts[];
          this.subject.next(this.posts);
      }, error => console.error(error));
    }

    createPost(post: IPosts) {
      return this.http.post<any>(this.baseUrl + 'Posts/CreatePost', JSON.stringify(post), { headers: this.headers });
    }
}

export interface IPosts {
  IdPost: string;
  NamePost: string;
}
