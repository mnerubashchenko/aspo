/* Сервис компонента TableDevicesComponent.
 * Название: DevicesService.
 * Язык: TypeScript.
 * Краткое описание:
 *    Данный сервис описывает поля таблицы устройств и позволяет получить данные из этой таблицы.
 * Переменные, используемые в сервисе:
 *    devices - информация об устройствах, полученная из базы данных;
 *    subject - объект Observable;
 *    headers - HTTP заголовки для формирования HTTP запроса.
 * Метод, используемый в сервисе:
 *    getDevices() - получение данных из таблицы устройств.
 * Интерфейс, описываемый в сервисе:
 *    IDevice - интерфейс, описывающий бренд устройства.
 */

import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class DevicesService {
    devices: IDevice[];
    subject = new Subject<IDevice[]>();
  headers: HttpHeaders;

  /* Конструктор сервиса DevicesService.
   * Переменные, используемые в конструкторе:
   *      http - HTTP клиент;
   *      baseUrl - базовый URL адрес.
   */
  constructor(public http: HttpClient, @Inject('BASE_URL') public baseUrl: string) {
    this.headers = new HttpHeaders().set('content-type', 'application/json');
  }

  /* getDevices() - получение данных из таблицы устройств. */
  getDevices() {
    this.http.get<any>(this.baseUrl + 'Devices/GetDevices').subscribe(result => {
        this.devices = result as IDevice[];
        this.subject.next(this.devices);
    }, error => console.error(error));
  }
}

/* IDevice - интерфейс, описывающий устройства.
 * Свойства интерфейса:
 *      id - идентификатор устройства;
 *      Type - тип устройства;
 *      Caption - описание устройства;
 *      Brand - бренд устройства;
 *      model - модель устройства;
 *      Status - статус использования устройства;
 *      IpInput - базовый IP адрес устройства;
 *      ActualIp - актуальный IP адрес устройства;
 *      Port - порт, используемый устройством;
 *      PositionNumber - номер устройства.
 */
export interface IDevice {
  id: string;
  Type: string;
  Caption: string;
  Brand: string;
  model: string;
  Status: string;
  IpInput: string;
  ActualIp: string;
  Port: string;
  PositionNumber: string;
}
