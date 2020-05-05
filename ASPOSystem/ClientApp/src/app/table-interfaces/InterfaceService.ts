/* Сервис компонента TableInterfacesComponent.
 * Название: InterfaceService.
 * Язык: TypeScript.
 * Краткое описание:
 *    Данный сервис описывает поля таблицы интерфейсов и позволяет получить данные из этой таблицы.
 * Переменные, используемые в сервисе:
 *    interfaces - информация об интерфейсах, полученная из базы данных;
 *    subject - объект Observable;
 *    headers - HTTP заголовки для формирования HTTP запроса.
 * Метод, используемый в сервисе:
 *    getInterfaces() - получение данных из таблицы интерфейсов.
 * Интерфейс, описываемый в сервисе:
 *    IInterface - интерфейс, описывающий таблицу интерфейсов.
 */

import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class InterfaceService {
    interfaces: IInterface[];
    subject = new Subject<IInterface[]>();
    headers: HttpHeaders;

  /* Конструктор сервиса InterfaceService.
   * Переменные, используемые в конструкторе:
   *      http - HTTP клиент;
   *      baseUrl - базовый URL адрес.
   */
  constructor(public http: HttpClient, @Inject('BASE_URL') public baseUrl: string) {
    this.headers = new HttpHeaders().set('content-type', 'application/json');
  }

  /* getInterfaces() - получение данных из таблицы интерфейсов. */
  getInterfaces() {
    this.http.get<any>(this.baseUrl + 'Interface/GetInterfaces').subscribe(result => {
        this.interfaces = result as IInterface[];
        this.subject.next(this.interfaces);
    }, error => console.error(error));
  }
}

/* IDevice - интерфейс, описывающий таблицу интерфейсов.
 * Свойства интерфейса:
 *      id - идентификатор интерфейса;
 *      name - название интерфейса;
 *      IsReadyStatus - статус готовности интерфейса;
 *      IsUsed - статус использование интерфейса;
 *      SelectedPort - порт интерфейса;
 *      Type - тип интерфейса;
 *      IpInput - базовый IP адрес интерфейса;
 *      ActualIp - актуальный IP адрес интерфейса.
 */
export interface IInterface {
  id: string;
  name: string;
  IsReadyStatus: string;
  IsUsed: string;
  SelectedPort: string;
  Type: string;
  IpInput: string;
  ActualIp: string;
}
