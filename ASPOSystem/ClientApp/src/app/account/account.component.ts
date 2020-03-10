import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import { UsersService } from '../table-users/UsersService';
import { IRoles, RoleService } from '../table-roles/RoleService';
import { IPosts, PostService } from '../table-posts/PostService';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
    public user: IUsers;
    public roles: IRoles[];
    public posts: IPosts[];
    headers: HttpHeaders = new HttpHeaders({
        "Content-Type": "application/json"
    }) ;

    constructor(private usersService: UsersService, private roleService: RoleService, private postService: PostService, private http: HttpClient, @Inject('BASE_URL') public baseUrl: string) {
    this.usersService.subjectAuth.subscribe(this.userAccountReceived);
      this.usersService.getUserForAccount();

      this.roleService.subject.subscribe(this.rolesReceived);
        this.roleService.getRoles();

        this.postService.subject.subscribe(this.postsReceived);
        this.postService.getPosts();
    }

  ngOnInit() {
  }

  userAccountReceived = (data: IUsers) => {
      this.user = data;
    }

    rolesReceived = (data1: IRoles[]) => {
        this.roles = data1;
    }

    postsReceived = (data2: IPosts[]) => {
        this.posts = data2;
    }
}

export interface IUsers {
    IdUser: string;
    NameUser: string;
    MiddlenameUser: string;
    LastnameUser: string;
    LoginUser: string;
    PostUser: string;
    RoleUser: string;
}
