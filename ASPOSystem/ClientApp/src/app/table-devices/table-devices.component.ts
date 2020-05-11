/* Компонент таблицы устройств.
 * Название: TableDevicesComponent.
 * Язык: TypeScript.
 * Краткое описание:
 *    Данный компонент является страницей, отображающей информацию об устройстах в расширенной версии приложения.
 * Переменные, используемые в компоненте:
 *    devices - информация об устройствах;
 *    brands - информация о брендах устройств;
 *    types - информация о типах устройств;
 *    dataGrid - таблица, содержащая информацию об устройствах;
 *    store - логика отправки данных об устройствах на сервер;
 *    headers - HTTP заголовки для формирования HTTP запроса;
 *    ipPattern - правило, которому должен соответствовать IP адрес.
 * Методы, используемые в компоненте:
 *    onRowUpdating() - формирование набора данных об устройствах после редактирования для отправки на сервер;
 *    asyncValidation() - проверка валидности данных при изменении информации об устройстве;
 *    devicesReceived() - получение данных об устройствах из сервиса DevicesService;
 *    brandReceived() - получение данных о брендах устройств из сервиса BrandService;
 *    typedevReceived() - получение данных о типах устройств из сервиса TypedevService.
 */

import { Component, enableProdMode, ViewChild, Inject } from '@angular/core';
import { IDevice, DevicesService } from '../table-devices/DevicesService';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import CustomStore from "devextreme/data/custom_store";
import { DxDataGridComponent } from 'devextreme-angular';
import { IBrands, BrandService } from '../table-brands/BrandService';
import { ITypedev, TypedevService } from '../table-type-dev/TypedevService';

@Component({
    selector: 'app-table-devices',
    templateUrl: './table-devices.component.html',
    styleUrls: ['./table-devices.component.css']
})
export class TableDevicesComponent {
    public devices: IDevice[];
    public brands: IBrands[];
    public types: ITypedev[];
    @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;
    store: any;
    headers: HttpHeaders;
    ipPattern: any = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;


  /* Конструктор компонента TableDevicesComponent.
   * Переменные, используемые в конструкторе:
   *      deviceService - экземпляр сервиса DevicesService;
   *      brandService - экземпляр сервиса BrandService;
   *      typedevService - экземпляр сервиса TypedevService;
   *      http - HTTP клиент;
   *      baseUrl - базовый URL адрес.
   */
    constructor(private deviceService: DevicesService,
        private brandsService: BrandService, private typedevService: TypedevService, 
        public http: HttpClient, @Inject('BASE_URL') public baseUrl: string) {
        sessionStorage.setItem("locale", 'ru');
        this.asyncValidation = this.asyncValidation.bind(this);
        this.deviceService.subject.subscribe(this.devicesReceived);
        this.deviceService.getDevices();

        this.brandsService.subject.subscribe(this.brandReceived);
        this.brandsService.getBrands("full");

        this.typedevService.subject.subscribe(this.typedevReceived);
        this.typedevService.getTypedev("full");

        this.baseUrl = baseUrl;
        this.headers = new HttpHeaders().set('content-type', 'application/json');
        setTimeout(() => {
            this.store = new CustomStore({
                key: "id",
                load: () => this.devices,
                insert: (values) => this.http.post<any>(this.baseUrl + 'Devices/CreateDevice', JSON.stringify(values as IDevice), { headers: this.headers }).subscribe(
                    () => { this.deviceService.getDevices(); }),
                update: (key, values) =>
                    this.http.put<any>(this.baseUrl + 'Devices/UpdateDevice', JSON.stringify(values as IDevice), { headers: this.headers }).subscribe(
                        () => { this.deviceService.getDevices(); }),
                remove: (key) => this.http.delete<any>(this.baseUrl + 'Devices/DeleteDevice', { params: new HttpParams().set('idDevice', key) }).subscribe(() => { this.deviceService.getDevices(); })
            });
        }, 1000);

    }

   /* onRowUpdating() - формирование набора данных об устройствах после редактирования для отправки на сервер.
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

   /* asyncValidation() - проверка валидности данных при изменении информации об устройствах.
    * Формальный параметр:
    *      params - значение, которое валидируется.
    * Локальные переменные:
    *      cleanDevicesValidate - набор устройств, после удаления изменяемого устройства;
    *      check - флаг, определяющий, уникально ли входное значение.
    */
  asyncValidation(params) {
    let cleanDevicesValidate = this.devices.filter(item => item.id != params.data.id);
    let check = (cleanDevicesValidate.find(item => item.model.toLowerCase() == params.value.toLowerCase()) != null) ? false : true;
    return new Promise((resolve) => {
      resolve(check === true);
    });
  }

   /* devicesReceived() - получение данных о брендах устройств из сервиса DevicesService.
    * Формальный параметр:
    *      data - данные, пришедшие из сервиса DevicesService.
    */
    devicesReceived = (data: IDevice[]) => {
        this.devices = data;
        this.dataGrid.instance.refresh();
    }

   /* brandReceived() - получение данных о брендах устройств из сервиса BrandService.
    * Формальный параметр:
    *      data2 - данные, пришедшие из сервиса BrandService.
    */
    brandReceived = (data2: IBrands[]) => {
        this.brands = data2;
        this.dataGrid.instance.refresh();
    }

   /* typedevReceived() - получение данных о брендах устройств из сервиса TypedevService.
    * Формальный параметр:
    *      data3 - данные, пришедшие из сервиса TypedevService.
    */
    typedevReceived = (data3: ITypedev[]) => {
      this.types = data3;
      this.dataGrid.instance.refresh();
    }

}
