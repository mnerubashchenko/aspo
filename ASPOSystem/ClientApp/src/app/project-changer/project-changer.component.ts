/* Компонент изменения данных о протоколе.
 * Название: ProjectChangerComponent.
 * Язык: TypeScript.
 * Краткое описание:
 *    Данный компонент является формой изменения данных о протоколе.
 * Переменные, используемые в компоненте:
 *    projects - название всех протоколов;
 *    projectName - название выбранного протокола;
 *    projectInfo - вся информация о выбранном протоколе;
 *    comments - комментарии к выбранному протоколу;
 *    users - информация о пользователях;
 *    measures - названия всех измерений базы данных;
 *    devices - названия всех устройств базы данных;
 *    interfaces - названия всех интерфейсов базы данных;
 *    commands - названия всех программных команд базы данных;
 *    telemetries - названия всех телеметрий базы данных;
 *    selectedMeasures - названия измерений, используемых в выбранном протоколе;
 *    selectedDevices - названия устройств, используемых в выбранном протоколе;
 *    selectedInterfaces - названия интерфейсов, используемых в выбранном протоколе;
 *    selectedCommands - названия программных команд, используемых в выбранном протоколе;
 *    selectedTelemetries - названия телеметрий, используемых в выбранном протоколе;
 *    checkMeasures - названия измерений, используемых в выбранном протоколе, для проверки перед отправкой на сервер;
 *    checkDevices - названия устройств, используемых в выбранном протоколе, для проверки перед отправкой на сервер;
 *    checkInterfaces - названия интерфейсов, используемых в выбранном протоколе, для проверки перед отправкой на сервер;
 *    checkCommands - названия программных команд, используемых в выбранном протоколе, для проверки перед отправкой на сервер;
 *    checkTelemetries - названия телеметрий, используемых в выбранном протоколе, для проверки перед отправкой на сервер;
 *    headers - HTTP заголовки для формирования HTTP запроса;
 *    selectBox - SelectBox, с помощью которого выбирается нужный протокол.
 * Методы, используемые в компоненте:
 *    selectedTable() - определение выбранного протокола;
 *    saveInfoAboutProject() - сохранение основной информации о протоколе;
 *    saveMeasures() - сохранение списка измерений выбранного протокола;
 *    saveDevices() - сохранение списка устройств выбранного протокола;
 *    saveInterfaces() - сохранение списка интерфейсов выбранного протокола;
 *    saveCommands() - сохранение списка программных команд выбранного протокола;
 *    saveTelemetries() - сохранение списка телеметрий выбранного протокола;
 *    addComment() - добавление комметария к протоколу после сохранения любого действия.
 */

import { Component, Inject, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { IProject } from '../table-projects/ProjectService';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';
import { DxSelectBoxComponent } from 'devextreme-angular';
import { IComments } from '../table-comments/CommentsService';
import { IUsers } from '../table-users/UsersService';
import notify from 'devextreme/ui/notify';

@Component({
  selector: 'app-project-changer',
  templateUrl: './project-changer.component.html',
  styleUrls: ['./project-changer.component.css']
})
export class ProjectChangerComponent {
  projects: string;
  projectName: string;
  projectInfo: IProject = { id: '', nameProject: '', descriptionProject: '', dateCreateProject: new Date(), directorProject: '' };
  comments: IComments[];
  users: IUsers[];
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
  checkMeasures: string[];
  checkDevices: string[];
  checkInterfaces: string[];
  checkCommands: string[];
  checkTelemetries: string[];
  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json"
  });
  @ViewChild(DxSelectBoxComponent) selectBox: DxSelectBoxComponent;

  /* Конструктор компонента ProjectChangerComponent.
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

    this.projectName = data.value;

    if (this.projectName != null) {
      Observable.forkJoin(
        this.http.get<any>(this.baseUrl + "Projects/GetOneProject", {
          params: new HttpParams().set("projectName", this.projectName)
        }),
        this.http.get<any>(this.baseUrl + 'Measure/GetNamesOfMeasures'),
        this.http.get<any>(this.baseUrl + "ProjectMeasure/GetLinksForOneProject", {
          params: new HttpParams().set("projectName", this.projectName)
        }),
        this.http.get<any>(this.baseUrl + 'Devices/GetNamesOfDevices'),
        this.http.get<any>(this.baseUrl + "ProjectDevice/GetLinksForOneProject", {
          params: new HttpParams().set("projectName", this.projectName)
        }),
        this.http.get<any>(this.baseUrl + 'Interface/GetNamesOfInterfaces'),
        this.http.get<any>(this.baseUrl + "ProjectInterface/GetLinksForOneProject", {
          params: new HttpParams().set("projectName", this.projectName)
        }),
        this.http.get<any>(this.baseUrl + 'ProgrammCommands/GetNamesOfCommands'),
        this.http.get<any>(this.baseUrl + "ProjectCommand/GetLinksForOneProject", {
          params: new HttpParams().set("projectName", this.projectName)
        }),
        this.http.get<any>(this.baseUrl + 'Telemetry/GetNamesOfTelemetries'),
        this.http.get<any>(this.baseUrl + "ProjectTelemetry/GetLinksForOneProject", {
          params: new HttpParams().set("projectName", this.projectName)
        }),
        this.http.get<any>(this.baseUrl + "Comments/GetCommentsForOneProject", {
          params: new HttpParams().set("projectName", this.projectName)
        }),
        this.http.get<any>(this.baseUrl + "Users/GetUsers", {
          params: new HttpParams().set("correction", "full")
        })
      ).subscribe(([res1, res2, res3, res4, res5, res6, res7, res8, res9, res10, res11, res12, res13]) => {
        this.projectInfo = res1;
        this.measures = res2;
        this.selectedMeasures = res3;
        this.checkMeasures = res3;
        this.devices = res4;
        this.selectedDevices = res5;
        this.checkDevices = res5;
        this.interfaces = res6;
        this.selectedInterfaces = res7;
        this.checkInterfaces = res7;
        this.commands = res8;
        this.selectedCommands = res9;
        this.checkCommands = res9;
        this.telemetries = res10;
        this.selectedTelemetries = res11;
        this.checkTelemetries = res11;
        this.comments = res12;
        this.users = res13;
      });
    }
  }

  /* saveInfoAboutProject() - сохранение основной информации о протоколе.
   * Формальный параметр:
   *      form - данные с формы изменения основной информации протокола.
   */
  public saveInfoAboutProject = (form: NgForm) => {

    if (form.controls.nameProject.value == this.projectInfo.nameProject &&
      form.controls.descriptionProject.value == this.projectInfo.descriptionProject) {
      notify({
        message: "Вы не произвели никаких изменений!", width: 300, shading: false,
        position: { my: 'top', at: 'top', of: window, offset: '0 10' },
        animation: {
          show: { duration: 300, type: "slide", from: { top: -50 } },
          hide: { duration: 300, type: "slide", to: { top: -50 } }
        }
      }, "warning", 1000);
    }

    else if (form.controls.nameProject.value != "") {
      this.http.put<any>(this.baseUrl + 'Projects/UpdateProjectFromProjectChanger',
      { headers: this.headers }, {
        params: new HttpParams().set("projectId", form.controls.idProject.value)
        .set("newProjectName", form.controls.nameProject.value)
        .set("newProjectDescription", form.controls.descriptionProject.value)
      }).subscribe(result => {
         this.http.get<any>(this.baseUrl + 'Projects/GetNamesOfProjects').subscribe(result => {
         this.projects = result as string;
         }, error => console.error(error));
        this.http.post<any>(this.baseUrl + "Comments/CreateComment", { headers: this.headers },
          {
            params: new HttpParams().set("nameProject", form.controls.nameProject.value)
              .set("authorProject", localStorage.getItem("idOfUser"))
              .set("bodyComment", "Изменил информацию о проекте.")
          }).subscribe(res => { });
        notify({
          message: "Информация о проекте изменена!", width: 300, shading: false,
          position: { my: 'top', at: 'top', of: window, offset: '0 10' },
          animation: {
            show: { duration: 300, type: "slide", from: { top: -50 } },
            hide: { duration: 300, type: "slide", to: { top: -50 } }
          }
        }, "success", 1000);
          this.selectBox.value = null;
          this.selectBox.value = form.controls.nameProject.value;

        }, error => {
          notify({
            message: error.error, width: 300, shading: false,
            position: { my: 'top', at: 'top', of: window, offset: '0 10' },
            animation: {
              show: { duration: 300, type: "slide", from: { top: -50 } },
              hide: { duration: 300, type: "slide", to: { top: -50 } }
            }
          }, "error", 1000);
        });
      }
    else {
      notify({
        message: "Введите название проекта!", width: 300, shading: false,
        position: { my: 'top', at: 'top', of: window, offset: '0 10' },
        animation: {
          show: { duration: 300, type: "slide", from: { top: -50 } },
          hide: { duration: 300, type: "slide", to: { top: -50 } }
        }
      }, "warning", 1000);
    }
  }

  /* saveMeasures() - сохранение списка измерений выбранного протокола. */
  public saveMeasures() {
    if (JSON.stringify(this.checkMeasures) != JSON.stringify(this.selectedMeasures)) {
      this.http.put<any>(this.baseUrl + 'ProjectMeasure/UpdateLinkFromProjectChanger',
        { headers: this.headers }, {
        params: new HttpParams().set('projectName', this.projectName)
          .set("namesOfMeasures", JSON.stringify(this.selectedMeasures))
      }).subscribe(res => {
        this.addComment("Изменил список измерений проекта.");
        this.checkMeasures = this.selectedMeasures;
        notify({
          message: "Список измерений проекта изменен!", width: 300, shading: false,
          position: { my: 'top', at: 'top', of: window, offset: '0 10' },
          animation: {
            show: { duration: 300, type: "slide", from: { top: -50 } },
            hide: { duration: 300, type: "slide", to: { top: -50 } }
          }
        }, "success", 1000);
      });
    }
    else {
      notify({
        message: "Вы не изменили список измерений данного проекта!", width: 300, shading: false,
        position: { my: 'top', at: 'top', of: window, offset: '0 10' },
        animation: {
          show: { duration: 300, type: "slide", from: { top: -50 } },
          hide: { duration: 300, type: "slide", to: { top: -50 } }
        }
      }, "warning", 1000);
    }
  }

  /* saveDevices() - сохранение списка устройств выбранного протокола. */
  public saveDevices() {
    if (JSON.stringify(this.checkDevices) != JSON.stringify(this.selectedDevices)) {
      this.http.put<any>(this.baseUrl + 'ProjectDevice/UpdateLinkFromProjectChanger',
        { headers: this.headers }, {
        params: new HttpParams().set('projectName', this.projectName)
          .set("namesOfDevices", JSON.stringify(this.selectedDevices))
      }).subscribe(res => {
        this.addComment("Изменил список устройств проекта.");
        this.checkDevices = this.selectedDevices;
        notify({
          message: "Список устройств проекта изменен!", width: 300, shading: false,
          position: { my: 'top', at: 'top', of: window, offset: '0 10' },
          animation: {
            show: { duration: 300, type: "slide", from: { top: -50 } },
            hide: { duration: 300, type: "slide", to: { top: -50 } }
          }
        }, "success", 1000);
      });
    }
    else {
      notify({
        message: "Вы не изменили список устройств данного проекта!", width: 300, shading: false,
        position: { my: 'top', at: 'top', of: window, offset: '0 10' },
        animation: {
          show: { duration: 300, type: "slide", from: { top: -50 } },
          hide: { duration: 300, type: "slide", to: { top: -50 } }
        }
      }, "warning", 1000);
    }
  }

  /* saveInterfaces() - сохранение списка интерфейсов выбранного протокола. */
  public saveInterfaces() {
    if (JSON.stringify(this.checkInterfaces) != JSON.stringify(this.selectedInterfaces)) {
      this.http.put<any>(this.baseUrl + 'ProjectInterface/UpdateLinkFromProjectChanger',
        { headers: this.headers }, {
        params: new HttpParams().set('projectName', this.projectName)
          .set("namesOfInterfaces", JSON.stringify(this.selectedInterfaces))
      }).subscribe(res => {
        this.addComment("Изменил список интерфейсов проекта.");
        this.checkInterfaces = this.selectedInterfaces;
        notify({
          message: "Список интерфейсов проекта изменен!", width: 300, shading: false,
          position: { my: 'top', at: 'top', of: window, offset: '0 10' },
          animation: {
            show: { duration: 300, type: "slide", from: { top: -50 } },
            hide: { duration: 300, type: "slide", to: { top: -50 } }
          }
        }, "success", 1000);
      });
    }
    else {
      notify({
        message: "Вы не изменили список интерфейсов данного проекта!", width: 300, shading: false,
        position: { my: 'top', at: 'top', of: window, offset: '0 10' },
        animation: {
          show: { duration: 300, type: "slide", from: { top: -50 } },
          hide: { duration: 300, type: "slide", to: { top: -50 } }
        }
      }, "warning", 1000);
    }
  }

  /* saveCommands() - сохранение списка программных команд выбранного протокола. */
  public saveCommands() {
    if (JSON.stringify(this.checkCommands) != JSON.stringify(this.selectedCommands)) {
      this.http.put<any>(this.baseUrl + 'ProjectCommand/UpdateLinkFromProjectChanger',
        { headers: this.headers }, {
        params: new HttpParams().set('projectName', this.projectName)
          .set("namesOfCommands", JSON.stringify(this.selectedCommands))
      }).subscribe(res => {
        this.addComment("Изменил список программных команд проекта.");
        this.checkCommands = this.selectedCommands;
        notify({
          message: "Список программных команд проекта изменен!", width: 300, shading: false,
          position: { my: 'top', at: 'top', of: window, offset: '0 10' },
          animation: {
            show: { duration: 300, type: "slide", from: { top: -50 } },
            hide: { duration: 300, type: "slide", to: { top: -50 } }
          }
        }, "success", 1000);
      });
    }
    else {
      notify({
        message: "Вы не изменили список программных команд данного проекта!", width: 300, shading: false,
        position: { my: 'top', at: 'top', of: window, offset: '0 10' },
        animation: {
          show: { duration: 300, type: "slide", from: { top: -50 } },
          hide: { duration: 300, type: "slide", to: { top: -50 } }
        }
      }, "warning", 1000);
    }
  }

  /* saveTelemetries() - сохранение списка телеметрий выбранного протокола. */
  public saveTelemetries() {
    if (JSON.stringify(this.checkTelemetries) != JSON.stringify(this.selectedTelemetries)) {
      this.http.put<any>(this.baseUrl + 'ProjectTelemetry/UpdateLinkFromProjectChanger',
        { headers: this.headers }, {
        params: new HttpParams().set('projectName', this.projectName)
          .set("namesOfTelemetries", JSON.stringify(this.selectedTelemetries))
      }).subscribe(res => {
        this.addComment("Изменил список телеметрий проекта.");
        this.checkTelemetries = this.selectedTelemetries;
        notify({
          message: "Список телеметрий проекта изменен!", width: 300, shading: false,
          position: { my: 'top', at: 'top', of: window, offset: '0 10' },
          animation: {
            show: { duration: 300, type: "slide", from: { top: -50 } },
            hide: { duration: 300, type: "slide", to: { top: -50 } }
          }
        }, "success", 1000);
      });
    }
    else {
      notify({
        message: "Вы не изменили список телеметрий данного проекта!", width: 300, shading: false,
        position: { my: 'top', at: 'top', of: window, offset: '0 10' },
        animation: {
          show: { duration: 300, type: "slide", from: { top: -50 } },
          hide: { duration: 300, type: "slide", to: { top: -50 } }
        }
      }, "warning", 1000);
    }
  }

  /* addComment() - добавление комметария к протоколу.
   * Формальный параметр:
   *      bodyComment - текст комментария.
   */
  public addComment(bodyComment: string) {
    this.http.post<any>(this.baseUrl + "Comments/CreateComment", { headers: this.headers },
      {
        params: new HttpParams().set("nameProject", this.projectName)
          .set("authorProject", localStorage.getItem("idOfUser"))
          .set("bodyComment", bodyComment)
      }).subscribe(res => {
        this.http.get<any>(this.baseUrl + "Comments/GetCommentsForOneProject", {
          params: new HttpParams().set("projectName", this.projectName)
        }).subscribe(res => this.comments = res);
      });
  }
}
