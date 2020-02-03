import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-table-posts',
  templateUrl: './table-posts.component.html',
  styleUrls: ['./table-posts.component.css']
})
export class TablePostsComponent {
    public posts: IPosts[];
  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<any>(baseUrl + 'api/Posts/GetPost').subscribe(result => {
        this.posts = result as IPosts[];
    }, error => console.error(error));
  }

  ngOnInit() {
  }

}

interface IPosts {
    IdPost: string;
    NamePost: string;
}
