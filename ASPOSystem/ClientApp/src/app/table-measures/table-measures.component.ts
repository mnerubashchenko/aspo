/* Компонент таблицы измерений.
 * Название: TableMeasuresComponent.
 * Язык: TypeScript.
 * Краткое описание:
 *    Данный компонент является страницей, отображающей информацию об измерениях в расширенной версии приложения.
 * Переменные, используемые в компоненте:
 *    measures - информация об измерениях;
 *    types - информация о типах измерений;
 *    dataGrid - таблица, содержащая информацию об измерениях;
 *    store - логика отправки данных об измерениях на сервер;
 *    headers - HTTP заголовки для формирования HTTP запроса.
 * Методы, используемые в компоненте:
 *    onRowUpdating() - формирование набора данных об измерениях после редактирования для отправки на сервер;
 *    asyncValidation() - проверка валидности данных при изменении информации об измерении;
 *    measureReceived() - получение данных об измерениях из сервиса MeasureService;
 *    typemeasureReceived() - получение данных о типах измерений из сервиса TypemeasureService.
 */

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
    public types: ITypemeasure[];
    @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;
    store: any;
  headers: HttpHeaders;

  /* Конструктор компонента TableMeasuresComponent.
   * Переменные, используемые в конструкторе:
   *      measureService - экземпляр сервиса MeasureService;
   *      typemeasureService - экземпляр сервиса TypemeasureService;
   *      http - HTTP клиент;
   *      baseUrl - базовый URL адрес.
   */
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

   /* onRowUpdating() - формирование набора данных об измерениях после редактирования для отправки на сервер.
    * Формальный параметр:
    *      e - данные строки.
    * Локальная переменная:
    *      property - переменная для перебора значений строки.
    */
    onRowUpdating(e) {
        for (var property in e.oldData) {
            if (!e.newData.hasOwnProperty(property)) {
                e.newData[property] = e.oldData[property];
            }
        }
    }

   /* asyncValidation() - проверка валидности данных при изменении информации об измерениях.
    * Формальный параметр:
    *      params - значение, которое валидируется.
    * Локальные переменные:
    *      cleanMeasuresValidate - набор измерений, после удаления изменяемого измерения;
    *      check - флаг, определяющий, уникально ли входное значение.
    */
  asyncValidation(params) {
    let cleanMeasuresValidate = this.measures.filter(item => item.id != params.data.id);
    let check = (cleanMeasuresValidate.find(item => item.name.toLowerCase() == params.value.toLowerCase()) != null) ? false : true;
    return new Promise((resolve) => {
      resolve(check === true);
    });
  }


   /* measureReceived() - получение данных об измерениях из сервиса MeasureService.
    * Формальный параметр:
    *      data - данные, пришедшие из сервиса MeasureService.
    */
    measureReceived = (data: IMeasure[]) => {
        this.measures = data;
        this.dataGrid.instance.refresh();
    }

   /* typemeasureReceived() - получение данных о типах измерений из сервиса TypemeasureService.
    * Формальный параметр:
    *      data1 - данные, пришедшие из сервиса TypemeasureService.
    */
    typemeasureReceived = (data1: ITypemeasure[]) => {
        this.types = data1;
        this.dataGrid.instance.refresh();
    }

}
