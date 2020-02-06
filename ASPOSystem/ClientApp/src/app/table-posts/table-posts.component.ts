import { Component, enableProdMode, ViewChild, Inject } from '@angular/core';
import { IPosts, PostService } from './PostService';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DxDataGridComponent } from 'devextreme-angular';
import CustomStore from "devextreme/data/custom_store";

@Component({
  selector: 'app-table-posts',
  templateUrl: './table-posts.component.html',
  styleUrls: ['./table-posts.component.css']
})
export class TablePostsComponent {
    public posts: IPosts[];
    @ViewChild(DxDataGridComponent, { static: false }) dataGrid: DxDataGridComponent;
    store: any;
    headers: HttpHeaders;
    constructor(private postService: PostService, public http: HttpClient, @Inject('BASE_URL') public baseUrl: string) {
        this.postService.subject.subscribe(this.postsReceived);
        this.postService.getPosts();
        this.baseUrl = baseUrl;
        this.headers = new HttpHeaders().set('content-type', 'application/json');
        this.store = new CustomStore({
          key: "idPost",
          load: () => this.posts,
          insert: (values) => this.http.post<any>(this.baseUrl + 'Posts/CreatePost', JSON.stringify(values as IPosts), { headers: this.headers }).subscribe(
            () => { this.postService.getPosts(); }),
          //update: (key, values) => {
          //  console.log(key,values);
          //},
          //remove: (key) => {
          //  console.log(key);
          //}
        });
    }

    postsReceived = (data: IPosts[]) => {
        this.posts = data;
        this.dataGrid.instance.refresh();
    }

    ngOnInit() {
      //this.postService.getPosts();
    }

}
