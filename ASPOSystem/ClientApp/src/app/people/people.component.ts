/* Компонент кадров.
 * Название: PeopleComponent.
 * Язык: TypeScript.
 * Краткое описание:
 *    Данный компонент является доступом к таблицам, связанным с пользователями в расширенной версии приложения.
 * Переменные, используемые в компоненте:
 *    people - названия всех таблиц базы данных, связанных с пользователями;
 *    tablename - название выбранной таблицы.
 * Метод, используемый в компоненте:
 *    selectedTable() - определение выбранной таблицы.
 */

import { Component } from '@angular/core';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent {
    people: string[] = ["Пользователи", "Роли", "Должности"];
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
