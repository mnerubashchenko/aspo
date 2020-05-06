/* Компонент справочников.
 * Название: HandbooksComponent.
 * Язык: TypeScript.
 * Краткое описание:
 *    Данный компонент является доступом к справочникам в расширенной версии приложения.
 * Переменные, используемые в компоненте:
 *    handbooks - названия всех справочников базы данных;
 *    tablename - название выбранной таблицы.
 * Метод, используемый в компоненте:
 *    selectedTable() - определение выбранной таблицы.
 */

import { Component } from '@angular/core';

@Component({
  selector: 'app-handbooks',
  templateUrl: './handbooks.component.html',
  styleUrls: ['./handbooks.component.css']
})
export class HandbooksComponent{

    handbooks: string[] = ["Бренды устройств", "Программные команды", "Телеметрии", "Типы интерфейсов", "Типы устройств", "Типы измерений"];
    tablename: string;

  /* Конструктор компонента HandbooksComponent. */
    constructor() { }

   /* selectedTable() - определение выбранной таблицы.
    * Формальный параметр:
    *      data - выбранное значение SelectBox.
    */
    public selectedTable(data) {
        this.tablename = data.selectedItem;
    }
}
