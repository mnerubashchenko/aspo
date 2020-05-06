/* Компонент таблицы типов интерфейсов.
 * Название: TableTypeInterComponent.
 * Язык: TypeScript.
 * Краткое описание:
 *    Данный компонент является страницей, отображающей информацию о типах интерфейсов в расширенной версии приложения.
 * Переменные, используемые в компоненте:
 *    typesinter - информация о типах интерфейсов;
 *    dataGrid - таблица, содержащая информацию о типах интерфейсов;
 *    store - логика отправки данных о типах интерфейсов на сервер;
 *    headers - HTTP заголовки для формирования HTTP запроса.
 * Методы, используемые в компоненте:
 *    onRowUpdating() - формирование набора данных о типах интерфейсов после редактирования для отправки на сервер;
 *    asyncValidation() - проверка валидности данных при изменении информации о типе интерфейса;
 *    typesinterReceived() - получение данных о типах интерфейсов из сервиса TypeinterService.
 */

import { Component, enableProdMode, ViewChild, Inject } from '@angular/core';
import { ITypeinter, TypeinterService } from './TypeinterService';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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

  /* Конструктор компонента TableTypeInterComponent.
   * Переменные, используемые в конструкторе:
   *      typeInterService - экземпляр сервиса TypeinterService;
   *      http - HTTP клиент;
   *      baseUrl - базовый URL адрес.
   */
    constructor(private typeInterService: TypeinterService, public http: HttpClient, @Inject('BASE_URL') public baseUrl: string) {
      sessionStorage.setItem("locale", 'ru');
      this.asyncValidation = this.asyncValidation.bind(this);
      this.typeInterService.subject.subscribe(this.typesinterReceived);
      this.typeInterService.getTypeinter("not full");
      this.baseUrl = baseUrl;
      this.headers = new HttpHeaders().set('content-type', 'application/json');
      this.store = new CustomStore({
        key: "id",
        load: () => this.typesinter,
        insert: (values) => this.http.post<any>(this.baseUrl + 'Typeinter/CreateTypeinter', JSON.stringify(values as ITypeinter), { headers: this.headers }).subscribe(
          () => { this.typeInterService.getTypeinter("not full"); }),
        update: (key, values) =>
            this.http.put<any>(this.baseUrl + 'Typeinter/UpdateTypeinter', JSON.stringify(values as ITypeinter), { headers: this.headers }).subscribe(
              () => { this.typeInterService.getTypeinter("not full"); }),
          remove: (key) => this.http.delete<any>(this.baseUrl + 'Typeinter/DeleteTypeinter', { params: new HttpParams().set('idTypeinter', key) }).subscribe(() => { this.typeInterService.getTypeinter("not full"); })
      });
    }


   /* onRowUpdating() - формирование набора данных о типах интерфейсов после редактирования для отправки на сервер.
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

   /* asyncValidation() - проверка валидности данных при изменении информации о типах интерфейсов.
    * Формальный параметр:
    *      params - значение, которое валидируется.
    * Локальные переменные:
    *      cleanTypesinterValidate - набор типов интерфейсов, после удаления изменяемого типа интерфейса;
    *      check - флаг, определяющий, уникально ли входное значение.
    */
  asyncValidation(params) {
    let cleanTypesinterValidate = this.typesinter.filter(item => item.id != params.data.id);
    let check = (cleanTypesinterValidate.find(item => item.nameTypeinter.toLowerCase() == params.value.toLowerCase()) != null) ? false : true;
    return new Promise((resolve) => {
      resolve(check === true);
    });
  }


   /* typesinterReceived() - получение данных о типах интерфейсов из сервиса TypeinterService.
    * Формальный параметр:
    *      data - данные, пришедшие из сервиса TypeinterService.
    */
    typesinterReceived = (data: ITypeinter[]) => {
      this.typesinter = data;
      this.dataGrid.instance.refresh();
    }


}
