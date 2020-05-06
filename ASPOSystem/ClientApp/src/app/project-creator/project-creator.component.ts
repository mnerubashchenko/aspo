/* Компонент формы создания нового протокола.
 * Название: ProjectCreatorComponent.
 * Язык: TypeScript.
 * Краткое описание:
 *    Данный компонент является формой создания нового протокола.
 * Переменные, используемые в компоненте:
 *    measures - названия всех измерений базы данных;
 *    devices - названия всех устройств базы данных;
 *    interfaces - названия всех интерфейсов базы данных;
 *    commands - названия всех программных команд базы данных;
 *    telemetries - названия всех телеметрий базы данных;
 *    selectedMeasures - названия измерений, выбранных для создаваемого протокола;
 *    selectedDevices - названия устройств, выбранных для создаваемого протокола;
 *    selectedInterfaces - названия интерфейсов, выбранных для создаваемого протокола;
 *    selectedCommands - названия программных команд, выбранных для создаваемого протокола;
 *    selectedTelemetries - названия телеметрий, выбранных для создаваемого протокола;
 *    helper - флаг, отвечающий за отображение текущего шага создания протокола.
 * Методы, используемые в компоненте:
 *    next() - переход к следующему шагу создания протокола;
 *    back() - возврат к предыдущему шагу создания протокола;
 *    generateProject() - создание протокола с выбранными характеристиками.
 */

import { Component, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { IProject } from '../table-projects/ProjectService';
import { Observable } from 'rxjs';
import notify from 'devextreme/ui/notify';

@Component({
  selector: 'app-project-creator',
  templateUrl: './project-creator.component.html',
  styleUrls: ['./project-creator.component.css'],
})
export class ProjectCreatorComponent {
  measures: string[];
  devices: string[];
  interfaces: string[];
  commands: string[];
  telemetries: string[];
  selectedMeasures: string[] = [];
  selectedDevices: string[] = [];
  selectedInterfaces: string[] = [];
  selectedCommands: string[] = [];
  selectedTelemetries: string[] = [];
  helper: number = 0;

  /* Конструктор компонента ProjectCreatorComponent.
   * Переменные, используемые в конструкторе:
   *      http - HTTP клиент;
   *      baseUrl - базовый URL адрес.
   */
  constructor(private http: HttpClient, @Inject('BASE_URL') public baseUrl: string) {

    Observable.forkJoin(
      this.http.get<any>(this.baseUrl + 'Measure/GetNamesOfMeasures'),
      this.http.get<any>(this.baseUrl + 'Devices/GetNamesOfDevices'),
      this.http.get<any>(this.baseUrl + 'Interface/GetNamesOfInterfaces'),
      this.http.get<any>(this.baseUrl + 'ProgrammCommands/GetNamesOfCommands'),
      this.http.get<any>(this.baseUrl + 'Telemetry/GetNamesOfTelemetries')
    ).subscribe(([res1, res2, res3, res4, res5]) => {
      this.measures = res1;
      this.devices = res2;
      this.interfaces = res3;
      this.commands = res4;
      this.telemetries = res5;
    });

  }

  /* next() - переход к следующему шагу создания протокола. */
  public next() {
    this.helper++;
  }

  /* back() - возврат к предыдущему шагу создания протокола. */
  public back() {
    --this.helper;
  }

  /* generateProject() - создание протокола с выбранными характеристиками.
   * Формальный параметр:
   *      form - данные с формы создания протокола.
   */
  public generateProject = (form: NgForm) => {
    this.http.post<any>(this.baseUrl + "Projects/CreateProject", JSON.stringify(form.value as IProject), {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    }).subscribe(res => {

      this.http.post<any>(this.baseUrl + "ProjectMeasure/CreateLinkFromAccount", this.selectedMeasures, {
        headers: new HttpHeaders({
          "Content-Type": "application/json"
        })
      }).subscribe();

      this.http.post<any>(this.baseUrl + "ProjectDevice/CreateLinkFromAccount", this.selectedDevices, {
        headers: new HttpHeaders({
          "Content-Type": "application/json"
        })
      }).subscribe();

      this.http.post<any>(this.baseUrl + "ProjectInterface/CreateLinkFromAccount", this.selectedInterfaces, {
        headers: new HttpHeaders({
          "Content-Type": "application/json"
        })
      }).subscribe();

      this.http.post<any>(this.baseUrl + "ProjectCommand/CreateLinkFromAccount", this.selectedCommands, {
        headers: new HttpHeaders({
          "Content-Type": "application/json"
        })
      }).subscribe();

      this.http.post<any>(this.baseUrl + "ProjectTelemetry/CreateLinkFromAccount", this.selectedTelemetries, {
        headers: new HttpHeaders({
          "Content-Type": "application/json"
        })
      }).subscribe();

      this.http.post<any>(this.baseUrl + "Comments/CreateComment", {
        headers: new HttpHeaders({
          "Content-Type": "application/json"
        })},
        {
          params: new HttpParams().set("nameProject", form.controls.nameProject.value)
            .set("authorProject", localStorage.getItem("idOfUser"))
            .set("bodyComment", "Создал проект.")
        }).subscribe();
      notify({
        message: "Проект создан", width: 300, shading: false,
        position: { my: 'top', at: 'top', of: window, offset: '0 10' },
        animation: {
          show: { duration: 300, type: "slide", from: { top: -50 } },
          hide: { duration: 300, type: "slide", to: { top: -50 } }
        }
      }, "success", 1000);
      this.helper = 0;
      form.controls.nameProject.setValue("");
      form.controls.descriptionProject.setValue("");
    },
      error => {
        if (error.error == "Проект с таким названием уже существует!") {
          notify({
            message: error.error, width: 300, shading: false,
            position: { my: 'top', at: 'top', of: window, offset: '0 10' },
            animation: {
              show: { duration: 300, type: "slide", from: { top: -50 } },
              hide: { duration: 300, type: "slide", to: { top: -50 } }
            }
          }, "error", 1000);
        }
        else {
          notify({
            message: error.error, width: 300, shading: false,
            position: { my: 'top', at: 'top', of: window, offset: '0 10' },
            animation: {
              show: { duration: 300, type: "slide", from: { top: -50 } },
              hide: { duration: 300, type: "slide", to: { top: -50 } }
            }
          }, "error", 1000);
        }
      });
  }  
}
