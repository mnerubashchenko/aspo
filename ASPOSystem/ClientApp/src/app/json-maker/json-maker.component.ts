/* Компонент генератора файла настроек JSON.
 * Название: JsonMakerComponent.
 * Язык: TypeScript.
 * Краткое описание:
 *    Данный компонент является генератором файла настроек JSON.
 * Переменные, используемые в компоненте:
 *    projects - названия всех протоколов;
 *    projectname - название выбранного протокола;
 *    headers - HTTP заголовки для формирования HTTP запроса.
 * Методы, используемые в компоненте:
 *    selectedTable() - определение выбранного протокола;
 *    ConfigMaker() - генерация и скачивание файла настроек JSON.
 */

import { Component, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ProjectService } from '../table-projects/ProjectService';
import { saveAs } from 'file-saver/dist/FileSaver';
import CyrillicToTranslit = require('cyrillic-to-translit-js/dist/bundle');

@Component({
  selector: 'app-json-maker',
  templateUrl: './json-maker.component.html',
  styleUrls: ['./json-maker.component.css']
})
export class JsonMakerComponent {

  projects: string;
  projectname: string;
  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json"
  });

  /* Конструктор компонента JsonMakerComponent.
   * Переменные, используемые в конструкторе:
   *      http - HTTP клиент;
   *      baseUrl - базовый URL адрес.
   */
  constructor(public http: HttpClient, @Inject('BASE_URL') public baseUrl: string) {

    this.http.get<any>(this.baseUrl + 'Projects/GetNamesOfProjects').subscribe(result => {
      this.projects = result as string;
    }, error => console.error(error));

  }

   /* selectedTable() - определение выбранного протокола.
    * Формальный параметр:
    *      data - выбранное значение SelectBox.
    */
  public selectedTable(data) {
    this.projectname = data.selectedItem;
  }

   /* ConfigMaker() - генерация и скачивание файла настроек JSON.
    * Локальные переменные:
    *      blob - сгенерированный файл настроек;
    *      filename - имя файла.
    */
  private ConfigMaker() {
    this.http.post<any>(this.baseUrl + 'JSONMaker/ConfigMaker', { headers: this.headers }, { params: new HttpParams().set("nameProject", this.projectname) }).subscribe(
      result => {
        const blob = new Blob([JSON.stringify(result, null, 3)], { type: 'application/json' });
        const filename = 'Config_' + new CyrillicToTranslit().transform(this.projectname, "_") + '.json';
        saveAs(blob, filename);
      }, err => {
        console.log(err);
      });
  }

}
