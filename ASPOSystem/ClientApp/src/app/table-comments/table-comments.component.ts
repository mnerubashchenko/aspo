import { Component, ViewChild, Inject, OnInit } from '@angular/core';
import { CommentsService, IComments } from './CommentsService';
import CustomStore from "devextreme/data/custom_store";
import { DxDataGridComponent } from 'devextreme-angular';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { IProject, ProjectService } from '../table-projects/ProjectService';
import { IUsers, UsersService } from '../table-users/UsersService';

@Component({
  selector: 'app-table-comments',
  templateUrl: './table-comments.component.html',
  styleUrls: ['./table-comments.component.css']
})
export class TableCommentsComponent implements OnInit {
  public comments: IComments[];
  public projects: IProject[];
  public users: IUsers[];
  @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;
  store: any;
  headers: HttpHeaders;
  constructor(private commentsService: CommentsService, private projectService: ProjectService,
    private usersService: UsersService, public http: HttpClient, @Inject('BASE_URL') public baseUrl: string) {
    sessionStorage.setItem("locale", 'ru');

    this.commentsService.subject.subscribe(this.commentReceived);
    this.commentsService.getComments();

    this.usersService.subject.subscribe(this.usersReceived);
    this.usersService.getUsers("full");

    this.projectService.subject.subscribe(this.projectsReceived);
    this.projectService.getProjects();

    this.baseUrl = baseUrl;
    this.headers = new HttpHeaders().set('content-type', 'application/json');
    this.store = new CustomStore({
      key: "id",
      load: () => this.comments,
      insert: (values) => this.http.post<any>(this.baseUrl + 'Comments/CreateComment', JSON.stringify(values as IComments), { headers: this.headers }).subscribe(
        () => { this.commentsService.getComments(); }),
      update: (key, values) =>
        this.http.put<any>(this.baseUrl + 'Comments/UpdateComment', JSON.stringify(values as IComments), { headers: this.headers }).subscribe(
          () => { this.commentsService.getComments(); }),
      remove: (key) => this.http.delete<any>(this.baseUrl + 'Comments/DeleteComment', { params: new HttpParams().set('id', key) }).subscribe(() => { this.commentsService.getComments(); })
    });
  }
  onRowUpdating(e) {
    for (var property in e.oldData) {
      if (!e.newData.hasOwnProperty(property)) {
        e.newData[property] = e.oldData[property];
      }
    }
  }

  commentReceived = (data: IComments[]) => {
    this.comments = data;
    this.dataGrid.instance.refresh();
  }

  usersReceived = (data2: IUsers[]) => {
    this.users = data2;
    this.dataGrid.instance.refresh();
  }

  projectsReceived = (data2: IProject[]) => {
    this.projects = data2;
    this.dataGrid.instance.refresh();
  }

  ngOnInit() {
  }

}
