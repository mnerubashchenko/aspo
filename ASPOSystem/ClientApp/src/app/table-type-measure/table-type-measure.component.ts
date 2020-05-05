import { Component, enableProdMode, ViewChild, Inject } from '@angular/core';
import { ITypemeasure, TypemeasureService } from './TypemeasureService';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import CustomStore from "devextreme/data/custom_store";
import { DxDataGridComponent } from 'devextreme-angular';

@Component({
  selector: 'app-table-type-measure',
    templateUrl: './table-type-measure.component.html',
    styleUrls: ['./table-type-measure.component.css']
})
export class TableTypeMeasureComponent {
  public typesmeasure: ITypemeasure[];
  public typesmeasureValidate: ITypemeasure[];
  @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;
  store: any;
  headers: HttpHeaders;
  constructor(private typeMeasureService: TypemeasureService, public http: HttpClient, @Inject('BASE_URL') public baseUrl: string) {
    sessionStorage.setItem("locale", 'ru');
    this.asyncValidation = this.asyncValidation.bind(this);
    this.typeMeasureService.subject.subscribe(this.typesmeasureReceived);
    this.typeMeasureService.getTypemeasure("not full");
    this.baseUrl = baseUrl;
    this.headers = new HttpHeaders().set('content-type', 'application/json');
    this.store = new CustomStore({
      key: "id",
      load: () => this.typesmeasure,
      insert: (values) => this.http.post<any>(this.baseUrl + 'Typemeasure/CreateTypemeasure', JSON.stringify(values as ITypemeasure), { headers: this.headers }).subscribe(
        () => { this.typeMeasureService.getTypemeasure("not full"); }),
      update: (key, values) =>
          this.http.put<any>(this.baseUrl + 'Typemeasure/UpdateTypemeasure', JSON.stringify(values as ITypemeasure), { headers: this.headers }).subscribe(
            () => { this.typeMeasureService.getTypemeasure("not full"); }),
        remove: (key) => this.http.delete<any>(this.baseUrl + 'Typemeasure/DeleteTypemeasure', { params: new HttpParams().set('idTypemeasure', key) }).subscribe(() => {
          this.typeMeasureService.getTypemeasure("not full");
        })
    });
    }

  onRowUpdating(e) {
    for (var property in e.oldData) {
      if (!e.newData.hasOwnProperty(property)) {
        e.newData[property] = e.oldData[property];
      }
    }
  }

  asyncValidation(params) {
    let cleanTypesmeasureValidate = this.typesmeasureValidate.filter(item => item.id != params.data.id);
    let check = (cleanTypesmeasureValidate.find(item => item.nameTypemeasure.toLowerCase() == params.value.toLowerCase()) != null) ? false : true;
    return new Promise((resolve) => {
      resolve(check === true);
    });
  }

    typesmeasureReceived = (data: ITypemeasure[]) => {
      this.typesmeasure = data;
      this.typesmeasureValidate = data;
      this.dataGrid.instance.refresh();
  }

  ngOnInit() {

  }

}
