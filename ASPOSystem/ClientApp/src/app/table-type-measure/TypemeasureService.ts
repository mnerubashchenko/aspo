/* Сервис компонента TableTypeMeasureComponent.
 * Название: TypemeasureService.
 * Язык: TypeScript.
 * Краткое описание:
 *    Данный сервис описывает поля таблицы типов измерений и позволяет получить данные из этой таблицы.
 * Переменные, используемые в сервисе:
 *    typesmeasure - информация о типах измерений, полученная из базы данных;
 *    subject - объект Observable;
 *    headers - HTTP заголовки для формирования HTTP запроса.
 * Метод, используемый в сервисе:
 *    getTypemeasure() - получение данных из таблицы типов измерений.
 * Интерфейс, описываемый в сервисе:
 *    ITypemeasure - интерфейс, описывающий таблицу типов измерений.
 */
import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class TypemeasureService {
  typesmeasure: ITypemeasure[];
  subject = new Subject<ITypemeasure[]>();
  headers: HttpHeaders;

  /* Конструктор сервиса TypemeasureService.
   * Переменные, используемые в конструкторе:
   *      http - HTTP клиент;
   *      baseUrl - базовый URL адрес.
   */
  constructor(public http: HttpClient, @Inject('BASE_URL') public baseUrl: string ) {
    this.headers = new HttpHeaders().set('content-type', 'application/json');
  }

/* getTypemeasure() - получение данных из таблицы типов измерений.
 * Формальный параметр:
 *      correction - параметр, уточняющий, все ли данные нужны.
 */
  getTypemeasure(correction: string) {
    this.http.get<any>(this.baseUrl + 'Typemeasure/GetTypemeasure', {
      params: new HttpParams().set("correction", correction)
    }).subscribe(result => {
        this.typesmeasure = result as ITypemeasure[];
        this.subject.next(this.typesmeasure);
    }, error => console.error(error));
  }

}

/* ITypemeasure - интерфейс, описывающий таблицу типов измерений.
 * Свойства интерфейса:
 *      id - идентификатор типа измерения;
 *      nameTypemeasure - название типа измерения.
 */
export interface ITypemeasure {
  id: string;
  nameTypemeasure: string;
}
