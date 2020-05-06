/* Компонент основных таблиц.
 * Название: MainInformationComponent.
 * Язык: TypeScript.
 * Краткое описание:
 *    Данный компонент является доступом к основным таблицам в расширенной версии приложения.
 * Переменные, используемые в компоненте:
 *    maininfo - названия всех основных таблиц базы данных;
 *    tablename - название выбранной таблицы.
 * Метод, используемый в компоненте:
 *    selectedTable() - определение выбранной таблицы.
 */

import { Component } from '@angular/core';

@Component({
  selector: 'app-main-information',
  templateUrl: './main-information.component.html',
  styleUrls: ['./main-information.component.css']
})
export class MainInformationComponent {

    maininfo: string[] = ["Проекты", "Комментарии к проектам", "Интерфейсы", "Устройства", "Измерения"];
    tablename: string;

   /* Конструктор компонента MainInformationComponent. */
    constructor() { }

   /* selectedTable() - определение выбранной таблицы.
    * Формальный параметр:
    *      data - выбранное значение SelectBox.
    */
    public selectedTable(data) {
        this.tablename = data.selectedItem;
    }

}
