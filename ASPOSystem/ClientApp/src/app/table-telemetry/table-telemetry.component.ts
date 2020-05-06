/* Компонент таблицы телеметрий.
 * Название: TableTelemetryComponent.
 * Язык: TypeScript.
 * Краткое описание:
 *    Данный компонент является страницей, отображающей информацию о телеметриях в расширенной версии приложения.
 * Переменные, используемые в компоненте:
 *    telemetries - информация о телеметриях;
 *    dataGrid - таблица, содержащая информацию о телеметриях;
 *    store - логика отправки данных о телеметриях на сервер;
 *    headers - HTTP заголовки для формирования HTTP запроса.
 * Методы, используемые в компоненте:
 *    onRowUpdating() - формирование набора данных о телеметриях после редактирования для отправки на сервер;
 *    asyncValidation() - проверка валидности данных при изменении информации о телеметрии;
 *    telemetryReceived() - получение данных о ролях из сервиса TelemetryService.
 */

import { Component, enableProdMode, ViewChild, Inject } from '@angular/core';
import { ITelemetry, TelemetryService } from './TelemetryService';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import CustomStore from "devextreme/data/custom_store";
import { DxDataGridComponent } from 'devextreme-angular';

@Component({
  selector: 'app-table-telemetry',
  templateUrl: './table-telemetry.component.html',
  styleUrls: ['./table-telemetry.component.css']
})
export class TableTelemetryComponent {
    public telemetries: ITelemetry[];
    @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;
    store: any;
  headers: HttpHeaders;

  /* Конструктор компонента TableTelemetryComponent.
   * Переменные, используемые в конструкторе:
   *      telemetryService - экземпляр сервиса TelemetryService;
   *      http - HTTP клиент;
   *      baseUrl - базовый URL адрес.
   */
    constructor(private telemetryService: TelemetryService, public http: HttpClient, @Inject('BASE_URL') public baseUrl: string) {
        sessionStorage.setItem("locale", 'ru');
        this.asyncValidation = this.asyncValidation.bind(this);
        this.telemetryService.subject.subscribe(this.telemetryReceived);
        this.telemetryService.getTelemetry();
        this.baseUrl = baseUrl;
        this.headers = new HttpHeaders().set('content-type', 'application/json');
        this.store = new CustomStore({
          key: "id",
            load: () => this.telemetries,
            insert: (values) => this.http.post<any>(this.baseUrl + 'Telemetry/CreateTelemetry', JSON.stringify(values as ITelemetry), { headers: this.headers }).subscribe(
              () => { this.telemetryService.getTelemetry(); }),
          update: (key, values) =>
              this.http.put<any>(this.baseUrl + 'Telemetry/UpdateTelemetry', JSON.stringify(values as ITelemetry), { headers: this.headers }).subscribe(
                  () => { this.telemetryService.getTelemetry(); }),
            remove: (key) => this.http.delete<any>(this.baseUrl + 'Telemetry/DeleteTelemetry', { params: new HttpParams().set('idTelemetry', key) }).subscribe(() => { this.telemetryService.getTelemetry(); })
        });
    }

   /* onRowUpdating() - формирование набора данных о телеметриях после редактирования для отправки на сервер.
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


   /* asyncValidation() - проверка валидности данных при изменении информации о телеметриях.
    * Формальный параметр:
    *      params - значение, которое валидируется.
    * Локальные переменные:
    *      cleanTelemetriesValidate - набор телеметрий, после удаления изменяемой телеметрии;
    *      check - флаг, определяющий, уникально ли входное значение.
    */
  asyncValidation(params) {
    let cleanTelemetriesValidate = this.telemetries.filter(item => item.id != params.data.id);
    let check = (cleanTelemetriesValidate.find(item => item.shortName.toLowerCase() == params.value.toLowerCase()) != null) ? false : true;
    return new Promise((resolve) => {
      resolve(check === true);
    });
  }

   /* telemetryReceived() - получение данных о телеметриях из сервиса TelemetryService.
    * Формальный параметр:
    *      data - данные, пришедшие из сервиса TelemetryService.
    */
    telemetryReceived = (data: ITelemetry[]) => {
        this.telemetries = data;
        this.dataGrid.instance.refresh();
    }

}

