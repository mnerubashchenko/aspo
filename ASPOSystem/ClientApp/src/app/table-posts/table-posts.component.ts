import { Component, enableProdMode, ViewChild, Inject } from '@angular/core';
import { IPosts, PostService } from './PostService';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { DxDataGridComponent } from 'devextreme-angular';
import CustomStore from "devextreme/data/custom_store";

@Component({
  selector: 'app-table-posts',
  templateUrl: './table-posts.component.html',
  styleUrls: ['./table-posts.component.css']
})
export class TablePostsComponent {
    public posts: IPosts[];
    @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;
    store: any;
    headers: HttpHeaders;
  constructor(private postService: PostService, public http: HttpClient, @Inject('BASE_URL') public baseUrl: string) {
        sessionStorage.setItem("locale", 'ru');
        this.postService.subject.subscribe(this.postsReceived);
        this.postService.getPosts();
        this.baseUrl = baseUrl;
        this.headers = new HttpHeaders().set('content-type', 'application/json');
        this.store = new CustomStore({
          key: "id",
          load: () => this.posts,
          insert: (values) => this.http.post<any>(this.baseUrl + 'Posts/CreatePost', JSON.stringify(values as IPosts), { headers: this.headers }).subscribe(
            () => { this.postService.getPosts(); }),
          update: (key, values) =>
              this.http.put<any>(this.baseUrl + 'Posts/UpdatePost', JSON.stringify(values as IPosts), { headers: this.headers }).subscribe(
                () => { this.postService.getPosts(); }),
            remove: (key) => this.http.delete<any>(this.baseUrl + 'Posts/DeletePost', { params: new HttpParams().set('idPost', key) }).subscribe(() => { this.postService.getPosts(); })
        });
    }

  onRowUpdating(e) {
    for (var property in e.oldData) {
      if (!e.newData.hasOwnProperty(property)) {
        e.newData[property] = e.oldData[property];
      }
    }
  }

    postsReceived = (data: IPosts[]) => {
        this.posts = data;
        this.dataGrid.instance.refresh();
    }

    ngOnInit() {

    }

}
