import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.css']
})
export class TableViewComponent  {
    public categories: ICategory[];
    constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
        http.get<any>(baseUrl + 'api/Category/GetCategory').subscribe(result => {
            this.categories = result as ICategory[];
        }, error => console.error(error));
    }

  ngOnInit() {
  }

}

interface ICategory {
    IdCategory: string;
    NameCategory: string;
}
