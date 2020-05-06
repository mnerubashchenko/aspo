/* Компонент таблицы программных команд.
 * Название: TableProgrammCommandsComponent.
 * Язык: TypeScript.
 * Краткое описание:
 *    Данный компонент является страницей, отображающей информацию о программных командах в расширенной версии приложения.
 * Переменные, используемые в компоненте:
 *    commands - информация о программных командах;
 *    dataGrid - таблица, содержащая информацию о программных командах;
 *    store - логика отправки данных о программных командах на сервер;
 *    headers - HTTP заголовки для формирования HTTP запроса.
 * Методы, используемые в компоненте:
 *    onRowUpdating() - формирование набора данных о программных командах после редактирования для отправки на сервер;
 *    asyncValidation() - проверка валидности данных при изменении информации о программной команде;
 *    commandReceived() - получение данных о программных командах из сервиса PrCommandsService.
 */

import { Component, enableProdMode, ViewChild, Inject } from '@angular/core';
import { IProgrammcommands, PrCommandsService } from './PrCommandsService';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import CustomStore from "devextreme/data/custom_store";
import { DxDataGridComponent } from 'devextreme-angular';

@Component({
  selector: 'app-table-programm-commands',
  templateUrl: './table-programm-commands.component.html',
  styleUrls: ['./table-programm-commands.component.css']
})
export class TableProgrammCommandsComponent {
    public commands: IProgrammcommands[];
    @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;
    store: any;
    headers: HttpHeaders;

  /* Конструктор компонента TableProgrammCommandsComponent.
   * Переменные, используемые в конструкторе:
   *      commandService - экземпляр сервиса PrCommandsService;
   *      http - HTTP клиент;
   *      baseUrl - базовый URL адрес.
   */
    constructor(private commandService: PrCommandsService, public http: HttpClient, @Inject('BASE_URL') public baseUrl: string) {
        sessionStorage.setItem("locale", 'ru');
        this.asyncValidation = this.asyncValidation.bind(this);
        this.commandService.subject.subscribe(this.commandReceived);
        this.commandService.getCommand();
        this.baseUrl = baseUrl;
        this.headers = new HttpHeaders().set('content-type', 'application/json');
        this.store = new CustomStore({
          key: "id",
          load: () => this.commands,
            insert: (values) => this.http.post<any>(this.baseUrl + 'ProgrammCommands/CreateCommand', JSON.stringify(values as IProgrammcommands), { headers: this.headers }).subscribe(
              () => { this.commandService.getCommand(); }),
          update: (key, values) =>
              this.http.put<any>(this.baseUrl + 'ProgrammCommands/UpdateCommand', JSON.stringify(values as IProgrammcommands), { headers: this.headers }).subscribe(
                () => { this.commandService.getCommand(); }),
            remove: (key) => this.http.delete<any>(this.baseUrl + 'ProgrammCommands/DeleteCommand', { params: new HttpParams().set('idCommand', key) }).subscribe(() => { this.commandService.getCommand(); })
        });
    }

   /* onRowUpdating() - формирование набора данных о программных командах после редактирования для отправки на сервер.
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

   /* asyncValidation() - проверка валидности данных при изменении информации о программных командах.
    * Формальный параметр:
    *      params - значение, которое валидируется.
    * Локальные переменные:
    *      cleanCommandsValidate - набор программных команд, после удаления изменяемой команды;
    *      check - флаг, определяющий, уникально ли входное значение.
    */
  asyncValidation(params) {
    let cleanCommandsValidate = this.commands.filter(item => item.id != params.data.id);
    let check = (cleanCommandsValidate.find(item => item.name.toLowerCase() == params.value.toLowerCase()) != null) ? false : true;
    return new Promise((resolve) => {
      resolve(check === true);
    });
  }

   /* commandReceived() - получение данных о программных командах из сервиса PrCommandsService.
    * Формальный параметр:
    *      data - данные, пришедшие из сервиса PrCommandsService.
    */
    commandReceived = (data: IProgrammcommands[]) => {
        this.commands = data;
        this.dataGrid.instance.refresh();
    }

}
