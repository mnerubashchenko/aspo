import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import { IUsers, UsersService } from '../table-users/UsersService';
import { IRoles, RoleService } from '../table-roles/RoleService';
import { IPosts, PostService } from '../table-posts/PostService';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
    @ViewChild('accountForm') form: NgForm;
    public user: IUsers;
    public roles: IRoles[];
    public posts: IPosts[];
    public flagForReadOnly: boolean = true;
    public flagForChangeButtons: boolean = false;
    headers: HttpHeaders = new HttpHeaders({
        "Content-Type": "application/json"
    });

    constructor(private usersService: UsersService, private roleService: RoleService,
        private postService: PostService, private http: HttpClient, @Inject('BASE_URL') public baseUrl: string, private router: Router) {
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

    private buttonIsPressed() {
        this.flagForReadOnly = !this.flagForReadOnly;
        this.flagForChangeButtons = true;
    }

    private isChanged() {
        return this.flagForReadOnly;
    }

    private cancel() {
        this.usersService.subjectAuth.subscribe(this.userAccountReceived);
        this.usersService.getUserForAccount();
        this.form.resetForm(this.user);
        this.flagForReadOnly = !this.flagForReadOnly;
        this.flagForChangeButtons = false;
    }

    public account = (form: NgForm) => {
        this.http.put<any>(this.baseUrl + "Users/UpdateUser", JSON.stringify(form.value as IUsers), {
            headers: new HttpHeaders({
                "Content-Type": "application/json"
            })
        }).subscribe();
        this.flagForChangeButtons = false;
        this.flagForReadOnly = !this.flagForReadOnly;
    }
}
