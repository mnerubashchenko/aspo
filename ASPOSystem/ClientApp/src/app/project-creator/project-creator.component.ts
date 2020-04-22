import { Component, OnInit, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { IProject, ProjectService } from '../table-projects/ProjectService';

@Component({
  selector: 'app-project-creator',
  templateUrl: './project-creator.component.html',
  styleUrls: ['./project-creator.component.css']
})
export class ProjectCreatorComponent implements OnInit {
  user: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') public baseUrl: string) {
    this.user = localStorage.getItem("idOfUser");
  }

  ngOnInit() {
  }

  public generateProject = (form: NgForm) => {
    this.http.post<any>(this.baseUrl + "Projects/CreateProject", JSON.stringify(form.value as IProject), {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    }).subscribe();
  }

}
