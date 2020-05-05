import { Component, enableProdMode, ViewChild, Inject } from '@angular/core';
import { IMeasure, MeasureService } from '../table-measures/MeasureService';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import CustomStore from "devextreme/data/custom_store";
import { DxDataGridComponent } from 'devextreme-angular';
import { ITypemeasure, TypemeasureService } from '../table-type-measure/TypemeasureService';

@Component({
    selector: 'app-table-measures',
    templateUrl: './table-measures.component.html',
    styleUrls: ['./table-measures.component.css']
})
export class TableMeasuresComponent {
    public measures: IMeasure[];
    public measuresValidate: IMeasure[];
    public types: ITypemeasure[];
    @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;
    store: any;
    headers: HttpHeaders;
    constructor(private measureService: MeasureService, private typemeasureService: TypemeasureService,
        public http: HttpClient, @Inject('BASE_URL') public baseUrl: string) {
        sessionStorage.setItem("locale", 'ru');
        this.asyncValidation = this.asyncValidation.bind(this);
        this.measureService.subject.subscribe(this.measureReceived);
        this.measureService.getMeasures();

        this.typemeasureService.subject.subscribe(this.typemeasureReceived);
        this.typemeasureService.getTypemeasure("full");

        this.baseUrl = baseUrl;
        this.headers = new HttpHeaders().set('content-type', 'application/json');
        setTimeout(() => {
            this.store = new CustomStore({
                key: "id",
                load: () => this.measures,
                insert: (values) => this.http.post<any>(this.baseUrl + 'Measure/CreateMeasure', JSON.stringify(values as IMeasure), { headers: this.headers }).subscribe(
                    () => { this.measureService.getMeasures(); }),
                update: (key, values) =>
                    this.http.put<any>(this.baseUrl + 'Measure/UpdateMeasure', JSON.stringify(values as IMeasure), { headers: this.headers }).subscribe(
                        () => { this.measureService.getMeasures(); }),
                remove: (key) => this.http.delete<any>(this.baseUrl + 'Measure/DeleteMeasure', { params: new HttpParams().set('idMeasure', key) }).subscribe(() => { this.measureService.getMeasures(); })
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

  asyncValidation(params) {
    let cleanMeasuresValidate = this.measuresValidate.filter(item => item.id != params.data.id);
    let check = (cleanMeasuresValidate.find(item => item.name.toLowerCase() == params.value.toLowerCase()) != null) ? false : true;
    return new Promise((resolve) => {
      resolve(check === true);
    });
  }

    measureReceived = (data: IMeasure[]) => {
        this.measures = data;
        this.measuresValidate = data;
        this.dataGrid.instance.refresh();
    }

    typemeasureReceived = (data1: ITypemeasure[]) => {
        this.types = data1;
        this.dataGrid.instance.refresh();
    }

    ngOnInit() {

    }

}
