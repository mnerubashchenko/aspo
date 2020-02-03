import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-table-type-inter',
  templateUrl: './table-type-inter.component.html',
  styleUrls: ['./table-type-inter.component.css']
})
export class TableTypeInterComponent {
    public typesinter: ITypeinter[];
  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<any>(baseUrl + 'api/Typeinter/GetTypeinter').subscribe(result => {
        this.typesinter = result as ITypeinter[];
    }, error => console.error(error));
  }

  ngOnInit() {
  }

}

interface ITypeinter {
    IdTypeinter: string;
    NameTypeinter: string;
}
