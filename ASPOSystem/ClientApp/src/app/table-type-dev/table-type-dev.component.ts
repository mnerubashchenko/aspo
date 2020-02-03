import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-table-type-dev',
  templateUrl: './table-type-dev.component.html',
  styleUrls: ['./table-type-dev.component.css']
})
export class TableTypeDevComponent implements OnInit {
    public typesdev: ITypedev[];
  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<any>(baseUrl + 'api/Typedev/GetTypedev').subscribe(result => {
        this.typesdev = result as ITypedev[];
    }, error => console.error(error));
  }

  ngOnInit() {
  }

}

interface ITypedev {
    IdTypedev: string;
    NameTypedev: string;
}
