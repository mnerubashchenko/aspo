/* Компонент таблицы типов измерений.
 * Название: TableTypeMeasureComponent.
 * Язык: TypeScript.
 * Краткое описание:
 *    Данный компонент является страницей, отображающей информацию о типах измерений в расширенной версии приложения.
 * Переменные, используемые в компоненте:
 *    typesmeasure - информация о типах измерений;
 *    dataGrid - таблица, содержащая информацию о типах измерений;
 *    store - логика отправки данных о типах измерений на сервер;
 *    headers - HTTP заголовки для формирования HTTP запроса.
 * Методы, используемые в компоненте:
 *    onRowUpdating() - формирование набора данных о типах измерений после редактирования для отправки на сервер;
 *    asyncValidation() - проверка валидности данных при изменении информации о типе измерения;
 *    typesmeasureReceived() - получение данных о типах измерений из сервиса TypemeasureService.
 */

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
  @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;
  store: any;
  headers: HttpHeaders;

   /* Конструктор компонента TableTypeMeasureComponent.
   * Переменные, используемые в конструкторе:
   *      typeMeasureService - экземпляр сервиса TypemeasureService;
   *      http - HTTP клиент;
   *      baseUrl - базовый URL адрес.
   */
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


   /* onRowUpdating() - формирование набора данных о типах измерений после редактирования для отправки на сервер.
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

   /* asyncValidation() - проверка валидности данных при изменении информации о типах измерений.
    * Формальный параметр:
    *      params - значение, которое валидируется.
    * Локальные переменные:
    *      cleanTypesmeasureValidate - набор типов измерений, после удаления изменяемого типа измерения;
    *      check - флаг, определяющий, уникально ли входное значение.
    */
  asyncValidation(params) {
    let cleanTypesmeasureValidate = this.typesmeasure.filter(item => item.id != params.data.id);
    let check = (cleanTypesmeasureValidate.find(item => item.nameTypemeasure.toLowerCase() == params.value.toLowerCase()) != null) ? false : true;
    return new Promise((resolve) => {
      resolve(check === true);
    });
  }

   /* typesmeasureReceived() - получение данных о типах измерений из сервиса TypemeasureService.
    * Формальный параметр:
    *      data - данные, пришедшие из сервиса TypemeasureService.
    */
    typesmeasureReceived = (data: ITypemeasure[]) => {
      this.typesmeasure = data;
      this.dataGrid.instance.refresh();
    }

}
