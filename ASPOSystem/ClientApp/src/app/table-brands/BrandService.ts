/* Сервис компонента TableBrandsComponent.
 * Название: BrandsService.
 * Язык: TypeScript.
 * Краткое описание:
 *    Данный сервис описывает поля таблицы брендов устройств и позволяет получить данные из этой таблицы.
 * Переменные, используемые в сервисе:
 *    brands - информация о брендах, полученная из базы данных;
 *    subject - объект Observable;
 *    headers - HTTP заголовки для формирования HTTP запроса.
 * Метод, используемый в сервисе:
 *    getBrands() - получение данных из таблицы брендов устройств.
 * Интерфейс, описываемый в сервисе:
 *    IBrands - интерфейс, описывающий бренд устройства.
 */
import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class BrandService {
    brands: IBrands[];
    subject = new Subject<IBrands[]>();
    headers: HttpHeaders;

  /* Конструктор сервиса BrandsService.
   * Переменные, используемые в конструкторе:
   *      http - HTTP клиент;
   *      baseUrl - базовый URL адрес.
   */
  constructor (public http: HttpClient, @Inject('BASE_URL') public baseUrl: string ) {
    this.headers = new HttpHeaders().set('content-type', 'application/json');
  }

/* getBrands() - получение данных из таблицы брендов устройств.
 * Формальный параметр:
 *      correction - параметр, уточняющий, все ли данные нужны.
 */
  getBrands(correction: string) {
    this.http.get<any>(this.baseUrl + 'Brands/GetBrand', {
      params: new HttpParams().set("correction", correction)
    }).subscribe(result => {
        this.brands = result as IBrands[];
        this.subject.next(this.brands);
    }, error => console.error(error));
  }
}

/* IBrands - интерфейс, описывающий бренд устройства.
 * Свойства интерфейса:
 *      id - идентификатор бренда;
 *      nameBrand - название бренда.
 */
export interface IBrands {
  id: string;
  nameBrand: string;
}
