/* Компонент таблицы брендов устройств.
 * Название: TableBrandsComponent.
 * Язык: TypeScript.
 * Краткое описание:
 *    Данный компонент является страницей, отображающей бренды устройств в расширенной версии приложения.
 * Переменные, используемые в компоненте:
 *    brands - информация о брендах;
 *    dataGrid - таблица, содержащая бренды устройств;
 *    store - логика отправки данных о брендах устройств на сервер;
 *    headers - HTTP заголовки для формирования HTTP запроса.
 * Методы, используемые в компоненте:
 *    onRowUpdating() - формирование набора данных о брендах устройств после редактирования для отправки на сервер;
 *    asyncValidation() - проверка валидности данных при изменении информации о проекте;
 *    brandReceived() - получение данных о брендах устройств из сервиса BrandService.
 */

import { Component, enableProdMode, ViewChild, Inject } from '@angular/core';
import { BrandService, IBrands } from './BrandService';
import CustomStore from "devextreme/data/custom_store";
import { DxDataGridComponent } from 'devextreme-angular';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Component({
    selector: 'app-table-brands',
    templateUrl: './table-brands.component.html',
    styleUrls: ['./table-brands.component.css']
})
export class TableBrandsComponent {
    public brands: IBrands[];
    @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;
    store: any;
    headers: HttpHeaders;

  /* Конструктор компонента TableBrandsComponent.
   * Переменные, используемые в конструкторе:
   *      brandService - экземпляр сервиса BrandService;
   *      http - HTTP клиент;
   *      baseUrl - базовый URL адрес.
   */
    constructor(private brandService: BrandService, public http: HttpClient, @Inject('BASE_URL') public baseUrl: string) {
        sessionStorage.setItem("locale", 'ru');
        this.asyncValidation = this.asyncValidation.bind(this);
        this.brandService.subject.subscribe(this.brandReceived);
        this.brandService.getBrands("not full");
        this.baseUrl = baseUrl;
        this.headers = new HttpHeaders().set('content-type', 'application/json');
        this.store = new CustomStore({
          key: "id",
          load: () => this.brands,
          insert: (values) => this.http.post<any>(this.baseUrl + 'Brands/CreateBrand', JSON.stringify(values as IBrands), { headers: this.headers }).subscribe(
            () => { this.brandService.getBrands("not full");}),
            update: (key, values) =>
              this.http.put<any>(this.baseUrl + 'Brands/UpdateBrand', JSON.stringify(values as IBrands), { headers: this.headers }).subscribe(
                () => { this.brandService.getBrands("not full"); }),
          remove: (key) => this.http.delete<any>(this.baseUrl + 'Brands/DeleteBrand', { params: new HttpParams().set('id', key) }).subscribe(() => { this.brandService.getBrands("not full"); })
        });
    }

   /* onRowUpdating() - формирование набора данных о брендах после редактирования для отправки на сервер.
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

   /* asyncValidation() - проверка валидности данных при изменении информации о брендах.
    * Формальный параметр:
    *      params - значение, которое валидируется.
    * Локальные переменные:
    *      cleanBrandsValidate - набор брендов, после удаления изменяемого бренда;
    *      check - флаг, определяющий, уникально ли входное значение.
    */
  asyncValidation(params) {
    let cleanBrandsValidate = this.brands.filter(item => item.id != params.data.id);
    let check = (cleanBrandsValidate.find(item => item.nameBrand.toLowerCase() == params.value.toLowerCase()) != null) ? false : true;
    return new Promise((resolve) => {
      resolve(check === true);
    });
  }

   /* brandReceived() - получение данных о брендах устройств из сервиса BrandService.
    * Формальный параметр:
    *      data - данные, пришедшие из сервиса BrandService.
    */
    brandReceived = (data: IBrands[]) => {
        this.brands = data;
        this.dataGrid.instance.refresh();
    }

}
