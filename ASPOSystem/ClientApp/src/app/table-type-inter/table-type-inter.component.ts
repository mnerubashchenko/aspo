import { Component, enableProdMode, ViewChild, Inject } from '@angular/core';
import { ITypeinter, TypeinterService } from './TypeinterService';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import CustomStore from "devextreme/data/custom_store";
import { DxDataGridComponent } from 'devextreme-angular';


@Component({
  selector: 'app-table-type-inter',
    templateUrl: './table-type-inter.component.html',
    styleUrls: ['./table-type-inter.component.css']
})
export class TableTypeInterComponent {
  public typesinter: ITypeinter[];
  @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;
  store: any;
  headers: HttpHeaders;
    constructor(private typeInterService: TypeinterService, public http: HttpClient, @Inject('BASE_URL') public baseUrl: string) {
        sessionStorage.setItem("locale", 'ru');
      this.typeInterService.subject.subscribe(this.typesinterReceived);
      this.typeInterService.getTypeinter();
      this.baseUrl = baseUrl;
      this.headers = new HttpHeaders().set('content-type', 'application/json');
      this.store = new CustomStore({
        key: "idTypeinter",
        load: () => this.typesinter,
        insert: (values) => this.http.post<any>(this.baseUrl + 'Typeinter/CreateTypeinter', JSON.stringify(values as ITypeinter), { headers: this.headers }).subscribe(
          () => { this.typeInterService.getTypeinter(); }),
        //update: (key, values) => {
        //  console.log(key,values);
        //},
        //remove: (key) => {
        //  console.log(key);
        //}
      });
  }

    typesinterReceived = (data: ITypeinter[]) => {
      this.typesinter = data;
      this.dataGrid.instance.refresh();
  }

  ngOnInit() {

  }

}
