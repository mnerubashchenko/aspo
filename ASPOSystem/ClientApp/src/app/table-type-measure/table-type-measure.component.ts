import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-table-type-measure',
  templateUrl: './table-type-measure.component.html',
  styleUrls: ['./table-type-measure.component.css']
})
export class TableTypeMeasureComponent {
    public typesmeasure: ITypemeasure[];
  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<any>(baseUrl + 'api/Typemeasure/GetTypemeasure').subscribe(result => {
        this.typesmeasure = result as ITypemeasure[];
    }, error => console.error(error));
  }

  ngOnInit() {
  }

}

interface ITypemeasure {
    IdTypemeasure: string;
    NameTypemeasure: string;
}
