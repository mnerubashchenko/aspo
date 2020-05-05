/* Сервис компонента TableProgrammCommandsComponent.
 * Название: PrCommandsService.
 * Язык: TypeScript.
 * Краткое описание:
 *    Данный сервис описывает поля таблицы программных команд и позволяет получить данные из этой таблицы.
 * Переменные, используемые в сервисе:
 *    commands - информация о программных командах, полученная из базы данных;
 *    subject - объект Observable;
 *    headers - HTTP заголовки для формирования HTTP запроса.
 * Метод, используемый в сервисе:
 *    getCommand() - получение данных из таблицы программных команд.
 * Интерфейс, описываемый в сервисе:
 *    IProgrammcommands - интерфейс, описывающий таблицу программных команд.
 */
import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class PrCommandsService {
    commands: IProgrammcommands[];
    subject = new Subject<IProgrammcommands[]>();
    headers: HttpHeaders;

  /* Конструктор сервиса PrCommandsService.
   * Переменные, используемые в конструкторе:
   *      http - HTTP клиент;
   *      baseUrl - базовый URL адрес.
   */
  constructor(public http: HttpClient, @Inject('BASE_URL') public baseUrl: string ) {
    this.headers = new HttpHeaders().set('content-type', 'application/json');
  }

  /* getCommand() - получение данных из таблицы программных команд. */
  getCommand() {
      this.http.get<any>(this.baseUrl + 'ProgrammCommands/GetCommand').subscribe(result => {
        this.commands = result as IProgrammcommands[];
        this.subject.next(this.commands);
    }, error => console.error(error));
  }
}

/* IProgrammcommands - интерфейс, описывающий таблицу программных команд.
 * Свойства интерфейса:
 *      id - идентификатор программной команды;
 *      name - название программной команды;
 *      Code - код программной команды;
 *      LongName - полное название программной команды;
 *      Device - устройства, работающие с программной командой.
 */
export interface IProgrammcommands {
  id: string;
  name: string;
  Code: string;
  LongName: string;
  Device: string;
}
