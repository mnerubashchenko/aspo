/* Компонент таблицы интерфейсов.
 * Название: TableInterfacesComponent.
 * Язык: TypeScript.
 * Краткое описание:
 *    Данный компонент является страницей, отображающей информацию об интерфейсах в расширенной версии приложения.
 * Переменные, используемые в компоненте:
 *    interfaces - информация об интерфейсах;
 *    types - информация о типах интерфейсов;
 *    dataGrid - таблица, содержащая информацию об интерфейсах;
 *    store - логика отправки данных об интерфейсах на сервер;
 *    headers - HTTP заголовки для формирования HTTP запроса;
 *    ipPattern - правило, которому должен соответствовать IP адрес.
 * Методы, используемые в компоненте:
 *    onRowUpdating() - формирование набора данных об интерфейсах после редактирования для отправки на сервер;
 *    asyncValidation() - проверка валидности данных при изменении информации об интерфейсе;
 *    interfaceReceived() - получение данных об устройствах из сервиса InterfaceService;
 *    typeinterReceived() - получение данных о типах устройств из сервиса TypeinterService.
 */

import { Component, enableProdMode, ViewChild, Inject } from '@angular/core';
import { IInterface, InterfaceService } from '../table-interfaces/InterfaceService';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import CustomStore from "devextreme/data/custom_store";
import { DxDataGridComponent } from 'devextreme-angular';
import { ITypeinter, TypeinterService } from '../table-type-inter/TypeinterService';

@Component({
    selector: 'app-table-interfaces',
    templateUrl: './table-interfaces.component.html',
    styleUrls: ['./table-interfaces.component.css']
})
export class TableInterfacesComponent {
    public interfaces: IInterface[];
    public types: ITypeinter[];
    @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;
    store: any;
    headers: HttpHeaders;
    ipPattern: any = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

  /* Конструктор компонента TableInterfacesComponent.
   * Переменные, используемые в конструкторе:
   *      interfaceService - экземпляр сервиса InterfaceService;
   *      typeinterService - экземпляр сервиса TypeinterService;
   *      http - HTTP клиент;
   *      baseUrl - базовый URL адрес.
   */
    constructor(private interfaceService: InterfaceService, private typeinterService: TypeinterService,
        public http: HttpClient, @Inject('BASE_URL') public baseUrl: string) {
        sessionStorage.setItem("locale", 'ru');
        this.asyncValidation = this.asyncValidation.bind(this);
        this.interfaceService.subject.subscribe(this.interfaceReceived);
        this.interfaceService.getInterfaces();

        this.typeinterService.subject.subscribe(this.typeinterReceived);
        this.typeinterService.getTypeinter("full");


        this.baseUrl = baseUrl;
        this.headers = new HttpHeaders().set('content-type', 'application/json');
        setTimeout(() => {
            this.store = new CustomStore({
                key: "id",
                load: () => this.interfaces,
                insert: (values) => this.http.post<any>(this.baseUrl + 'Interface/CreateInterface', JSON.stringify(values as IInterface), { headers: this.headers }).subscribe(
                    () => { this.interfaceService.getInterfaces(); }),
                update: (key, values) =>
                    this.http.put<any>(this.baseUrl + 'Interface/UpdateInterface', JSON.stringify(values as IInterface), { headers: this.headers }).subscribe(
                        () => { this.interfaceService.getInterfaces(); }),
                remove: (key) => this.http.delete<any>(this.baseUrl + 'Interface/DeleteInterface', { params: new HttpParams().set('idInterface', key) }).subscribe(() => { this.interfaceService.getInterfaces(); })
            });
        }, 1000);

    }

   /* onRowUpdating() - формирование набора данных об интерфейсах после редактирования для отправки на сервер.
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

   /* asyncValidation() - проверка валидности данных при изменении информации об интерфейсах.
    * Формальный параметр:
    *      params - значение, которое валидируется.
    * Локальные переменные:
    *      cleanInterfacesValidate - набор интерфейсов, после удаления изменяемого интерфейса;
    *      check - флаг, определяющий, уникально ли входное значение.
    */
  asyncValidation(params) {
    let cleanInterfacesValidate = this.interfaces.filter(item => item.id != params.data.id);
    let check = (cleanInterfacesValidate.find(item => item.name.toLowerCase() == params.value.toLowerCase()) != null) ? false : true;
    return new Promise((resolve) => {
      resolve(check === true);
    });
  }

   /* interfaceReceived() - получение данных об интерфейсах из сервиса InterfaceService.
    * Формальный параметр:
    *      data - данные, пришедшие из сервиса InterfaceService.
    */
    interfaceReceived = (data: IInterface[]) => {
        this.interfaces = data;
        this.dataGrid.instance.refresh();
    }

   /* typeinterReceived() - получение данных об интерфейсах из сервиса TypeinterService.
    * Формальный параметр:
    *      data1 - данные, пришедшие из сервиса TypeinterService.
    */
    typeinterReceived = (data1: ITypeinter[]) => {
        this.types = data1;
        this.dataGrid.instance.refresh();
    }

}
