/* Сервис компонента TableMeasuresComponent.
 * Название: MeasureService.
 * Язык: TypeScript.
 * Краткое описание:
 *    Данный сервис описывает поля таблицы измерений и позволяет получить данные из этой таблицы.
 * Переменные, используемые в сервисе:
 *    measures - информация об измерениях, полученная из базы данных;
 *    subject - объект Observable;
 *    headers - HTTP заголовки для формирования HTTP запроса.
 * Метод, используемый в сервисе:
 *    getMeasures() - получение данных из таблицы измерений.
 * Интерфейс, описываемый в сервисе:
 *    IMeasure - интерфейс, описывающий таблицу измерений.
 */

import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class MeasureService {
    measures: IMeasure[];
    subject = new Subject<IMeasure[]>();
    headers: HttpHeaders;

  /* Конструктор сервиса MeasureService.
   * Переменные, используемые в конструкторе:
   *      http - HTTP клиент;
   *      baseUrl - базовый URL адрес.
   */
  constructor(public http: HttpClient, @Inject('BASE_URL') public baseUrl: string) {
    this.headers = new HttpHeaders().set('content-type', 'application/json');
  }


  /* getMeasures() - получение данных из таблицы измерений. */
  getMeasures() {
    this.http.get<any>(this.baseUrl + 'Measure/GetMeasures').subscribe(result => {
        this.measures = result as IMeasure[];
        this.subject.next(this.measures);
    }, error => console.error(error));
  }
}

/* IMeasure - интерфейс, описывающий таблицу измерений.
 * Свойства интерфейса:
 *      id - идентификатор измерения;
 *      Grouup - номер группы, в которую входит интерфейс;
 *      IdMeasure - название измерения;
 *      ParentId - идентификатор родительского элемента;
 *      name - название измерения;
 *      Caption - описание измерения;
 *      MinValue - минимальное значение измерения;
 *      MaxValue - максимальное значение измерения;
 *      IsCheck - статус проверки измерения;
 *      Status - статус измерения;
 *      Type - тип измерения;
 *      Factor - фактор измерения.
 */
export interface IMeasure {
    id: string;
    Grouup: string;
    IsParent: string;
    IdMeasure: string;
    ParentId: string;
    name: string;
    Caption: string;
    MinValue: string;
    MaxValue: string;
    IsCheck: string;
    Status: string;
    Type: string;
    Factor: string;
}
