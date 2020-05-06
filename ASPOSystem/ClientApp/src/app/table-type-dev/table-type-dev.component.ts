/* Компонент таблицы типов устройств.
 * Название: TableTypeDevComponent.
 * Язык: TypeScript.
 * Краткое описание:
 *    Данный компонент является страницей, отображающей информацию о типах устройств в расширенной версии приложения.
 * Переменные, используемые в компоненте:
 *    typesdev - информация о типах устройств;
 *    dataGrid - таблица, содержащая информацию о типах устройств;
 *    store - логика отправки данных о типах устройств на сервер;
 *    headers - HTTP заголовки для формирования HTTP запроса.
 * Методы, используемые в компоненте:
 *    onRowUpdating() - формирование набора данных о типах устройств после редактирования для отправки на сервер;
 *    asyncValidation() - проверка валидности данных при изменении информации о типе устройства;
 *    telemetryReceived() - получение данных о типах устройств из сервиса TypedevService.
 */

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

  /* Конструктор компонента TableTypeDevComponent.
   * Переменные, используемые в конструкторе:
   *      typedevService - экземпляр сервиса TypedevService;
   *      http - HTTP клиент;
   *      baseUrl - базовый URL адрес.
   */
    constructor(private typedevService: TypedevService, public http: HttpClient, @Inject('BASE_URL') public baseUrl: string) {
        sessionStorage.setItem("locale", 'ru');
        this.asyncValidation = this.asyncValidation.bind(this);
        this.typedevService.subject.subscribe(this.typesdevReceived);
        this.typedevService.getTypedev("not full");
        this.baseUrl = baseUrl;
        this.headers = new HttpHeaders().set('content-type', 'application/json');
        this.store = new CustomStore({
          key: "id",
            load: () => this.typesdev,
            insert: (values) => this.http.post<any>(this.baseUrl + 'Typedev/CreateTypedev', JSON.stringify(values as ITypedev), { headers: this.headers }).subscribe(
              () => { this.typedevService.getTypedev("not full"); }),
          update: (key, values) =>
              this.http.put<any>(this.baseUrl + 'Typedev/UpdateTypedev', JSON.stringify(values as ITypedev), { headers: this.headers }).subscribe(
                () => { this.typedevService.getTypedev("not full"); }),
            remove: (key) => this.http.delete<any>(this.baseUrl + 'Typedev/DeleteTypedev', { params: new HttpParams().set('idTypedev', key) }).subscribe(() => { this.typedevService.getTypedev("not full"); })
        });
    }

   /* onRowUpdating() - формирование набора данных о типах устройств после редактирования для отправки на сервер.
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

   /* asyncValidation() - проверка валидности данных при изменении информации о типах устройств.
    * Формальный параметр:
    *      params - значение, которое валидируется.
    * Локальные переменные:
    *      cleanTypesdevValidate - набор типов устройств, после удаления изменяемого типа устройства;
    *      check - флаг, определяющий, уникально ли входное значение.
    */
  asyncValidation(params) {
    let cleanTypesdevValidate = this.typesdev.filter(item => item.id != params.data.id);
    let check = (cleanTypesdevValidate.find(item => item.nameTypedev.toLowerCase() == params.value.toLowerCase()) != null) ? false : true;
    return new Promise((resolve) => {
      resolve(check === true);
    });
  }

   /* typesdevReceived() - получение данных о типах устройств из сервиса TypedevService.
    * Формальный параметр:
    *      data - данные, пришедшие из сервиса TypedevService.
    */
    typesdevReceived = (data: ITypedev[]) => {
        this.typesdev = data;
        this.dataGrid.instance.refresh();
    }

}
