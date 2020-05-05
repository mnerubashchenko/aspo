import { Component, OnInit, Inject, ViewChild } from '@angular/core';
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
export class ProjectChangerComponent implements OnInit {
  projects: string;
  projectName: string;
  projectInfo: IProject = { id: '', nameProject: '', descriptionProject: '', dateCreateProject: new Date(), directorProject: '' };
  comments: IComments[];
  newComment: IComments;
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

  constructor(public http: HttpClient, @Inject('BASE_URL') public baseUrl: string) {
    this.http.get<any>(this.baseUrl + 'Projects/GetNamesOfProjects').subscribe(result => {
      this.projects = result as string;
    }, error => console.error(error));
  }

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

  ngOnInit() {
  }

}
