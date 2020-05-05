/* Сервис компонента TableTelemetryComponent.
 * Название: TelemetryService.
 * Язык: TypeScript.
 * Краткое описание:
 *    Данный сервис описывает поля таблицы телеметрий и позволяет получить данные из этой таблицы.
 * Переменные, используемые в сервисе:
 *    telemetries - информация о телеметриях, полученная из базы данных;
 *    subject - объект Observable;
 *    headers - HTTP заголовки для формирования HTTP запроса.
 * Метод, используемый в сервисе:
 *    getTelemetry() - получение данных из таблицы телеметрий.
 * Интерфейс, описываемый в сервисе:
 *    ITelemetry - интерфейс, описывающий таблицу ролей.
 */
import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class TelemetryService {
    telemetries: ITelemetry[];
    subject = new Subject<ITelemetry[]>();
  headers: HttpHeaders;

  /* Конструктор сервиса TelemetryService.
   * Переменные, используемые в конструкторе:
   *      http - HTTP клиент;
   *      baseUrl - базовый URL адрес.
   */
  constructor(public http: HttpClient, @Inject('BASE_URL') public baseUrl: string ) {
    this.headers = new HttpHeaders().set('content-type', 'application/json');
  }

/* getTelemetry() - получение данных из таблицы телеметрий. */
  getTelemetry() {
    this.http.get<any>(this.baseUrl + 'Telemetry/GetTelemetry').subscribe(result => {
        this.telemetries = result as ITelemetry[];
        this.subject.next(this.telemetries);
    }, error => console.error(error));
  }
}

/* ITelemetry - интерфейс, описывающий таблицу телеметрий.
 * Свойства интерфейса:
 *      id - идентификатор телеметрии;
 *      HasItems - название роли?;
 *      ParentId - идентификатор родительского элемента;
 *      LongName - полное название телеметрии;
 *      shortName - сокращенной название телеметрии;
 *      ByteNumber - количество байтов;
 *      StartBit - первый бит;
 *      Lenght - длина;
 *      PossibleValues - возможные значения;
 *      Value - значение.
 */
export interface ITelemetry {
  id: string;
  HasItems: string;
  ParentId: string;
  LongName: string;
  shortName: string;
  ByteNumber: number;
  StartBit: number;
  Lenght: number;
  PossibleValues: string;
  Value: string;
}
