import { Component, Inject, OnInit } from '@angular/core';
import { IPosts, PostService } from './PostService';

@Component({
  selector: 'app-table-posts',
  templateUrl: './table-posts.component.html',
  styleUrls: ['./table-posts.component.css']
})
export class TablePostsComponent {
    public posts: IPosts[];
    constructor(private postService: PostService) {
        this.postService.subject.subscribe(this.postsReceived);
    }

    postsReceived = (data: IPosts[]) => {
      this.posts = data;
    }

    ngOnInit() {
      this.postService.getPosts();
    }

}
