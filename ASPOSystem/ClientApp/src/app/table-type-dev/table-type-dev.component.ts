import { Component, enableProdMode, ViewChild, Inject } from '@angular/core';
import { ITypedev, TypedevService } from './TypedevService';
import CustomStore from "devextreme/data/custom_store";
import { DxDataGridComponent } from 'devextreme-angular';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-table-type-dev',
    templateUrl: './table-type-dev.component.html',
    styleUrls: ['./table-type-dev.component.css']
})
export class TableTypeDevComponent {
    public typesdev: ITypedev[];
    @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;
    store: any;
    headers: HttpHeaders;
    constructor(private typedevService: TypedevService, public http: HttpClient, @Inject('BASE_URL') public baseUrl: string) {
        sessionStorage.setItem("locale", 'ru');
        this.typedevService.subject.subscribe(this.typesdevReceived);
        this.typedevService.getTypedev();
        this.baseUrl = baseUrl;
        this.headers = new HttpHeaders().set('content-type', 'application/json');
        this.store = new CustomStore({
          key: "idTypedev",
            load: () => this.typesdev,
            insert: (values) => this.http.post<any>(this.baseUrl + 'Typedev/CreateTypedev', JSON.stringify(values as ITypedev), { headers: this.headers }).subscribe(
              () => { this.typedevService.getTypedev(); }),
          update: (key, values) =>
              this.http.put<any>(this.baseUrl + 'Typedev/UpdateTypedev', JSON.stringify(values as ITypedev), { headers: this.headers }).subscribe(
                () => { this.typedevService.getTypedev(); }),
            remove: (key) => this.http.delete<any>(this.baseUrl + 'Typedev/DeleteTypedev', { params: new HttpParams().set('idTypedev', key) }).subscribe(() => { this.typedevService.getTypedev(); })
        });
    }

    onRowUpdating(e) {
      for (var property in e.oldData) {
        if (!e.newData.hasOwnProperty(property)) {
          e.newData[property] = e.oldData[property];
        }
      }
    }

    typesdevReceived = (data: ITypedev[]) => {
        this.typesdev = data;
        this.dataGrid.instance.refresh();
  }

  ngOnInit() {

  }

}
