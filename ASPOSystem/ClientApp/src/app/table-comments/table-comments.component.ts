import { Component, enableProdMode, ViewChild, Inject } from '@angular/core';
import { IComments, CommentsService } from '../table-comments/CommentsService';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import CustomStore from "devextreme/data/custom_store";
import { DxDataGridComponent } from 'devextreme-angular';
import { IUsers, UsersService } from '../table-users/UsersService';
import { IProtocol, ProtocolService } from '../table-protocol/ProtocolService';

@Component({
    selector: 'app-table-comments',
    templateUrl: './table-comments.component.html',
    styleUrls: ['./table-comments.component.css']
})
export class TableCommentsComponent {
    public comments: IComments[];
    public users: IUsers[];
    public protocols: IProtocol[];
    @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;
    store: any;
    headers: HttpHeaders;
    constructor(private commentService: CommentsService, private usersService: UsersService, private protocolService: ProtocolService,
        public http: HttpClient, @Inject('BASE_URL') public baseUrl: string) {
        sessionStorage.setItem("locale", 'ru');

        this.commentService.subject.subscribe(this.commentReceived);
        this.commentService.getComments();

        this.usersService.subject.subscribe(this.userReceived);
        this.usersService.getUsers();

        this.protocolService.subject.subscribe(this.protocolReceived);
        this.protocolService.getProtocols();

        this.baseUrl = baseUrl;
        this.headers = new HttpHeaders().set('content-type', 'application/json');
        setTimeout(() => {
            this.store = new CustomStore({
                key: "idComment",
                load: () => this.comments,
                insert: (values) => this.http.post<any>(this.baseUrl + 'Comments/CreateComment', JSON.stringify(values as IComments), { headers: this.headers }).subscribe(
                    () => { this.commentService.getComments(); }),
                update: (key, values) =>
                    this.http.put<any>(this.baseUrl + 'Comments/UpdateComment', JSON.stringify(values as IComments), { headers: this.headers }).subscribe(
                        () => { this.commentService.getComments(); }),
                remove: (key) => this.http.delete<any>(this.baseUrl + 'Comments/DeleteComment', { params: new HttpParams().set('idComment', key) }).subscribe(() => { this.commentService.getComments(); })
            });
        }, 1000);

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

    userReceived = (data1: IUsers[]) => {
        this.users = data1;
        this.dataGrid.instance.refresh();
    }

    protocolReceived = (data2: IProtocol[]) => {
        this.protocols = data2;
        this.dataGrid.instance.refresh();
    }

    ngOnInit() {

    }

}
