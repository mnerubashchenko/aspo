import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { IProject, ProjectService } from '../table-projects/ProjectService';
import { saveAs } from 'file-saver/dist/FileSaver';
import CyrillicToTranslit = require('cyrillic-to-translit-js/dist/bundle');

@Component({
  selector: 'app-json-maker',
  templateUrl: './json-maker.component.html',
  styleUrls: ['./json-maker.component.css']
})
export class JsonMakerComponent implements OnInit {

  projects: string;
  projectname: string;

  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json"
  });

  constructor(public http: HttpClient, @Inject('BASE_URL') public baseUrl: string, projectService: ProjectService) {

    this.http.get<any>(this.baseUrl + 'Projects/GetNamesOfProjects').subscribe(result => {
      this.projects = result as string;
    }, error => console.error(error));

  }

  public selectedTable(data) {
    this.projectname = data.selectedItem;
  }

  private ConfigMaker() {
    this.http.post<any>(this.baseUrl + 'JSONMaker/ConfigMaker', { headers: this.headers }, { params: new HttpParams().set("nameProject", this.projectname) }).subscribe(
      result => {
        const blob = new Blob([JSON.stringify(result, null, 3)], { type: 'application/json' });
        const filename = 'Config_' + new CyrillicToTranslit().transform(this.projectname, "_") + '.json';
        saveAs(blob, filename);
      }, err => {
        console.log(err);
      });
  }

  ngOnInit() {
  }

}
