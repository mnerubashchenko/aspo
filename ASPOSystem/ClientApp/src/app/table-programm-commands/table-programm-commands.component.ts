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
    constructor(private commandService: PrCommandsService, public http: HttpClient, @Inject('BASE_URL') public baseUrl: string) {
        sessionStorage.setItem("locale", 'ru');
        this.commandService.subject.subscribe(this.commandReceived);
        this.commandService.getCommand();
        this.baseUrl = baseUrl;
        this.headers = new HttpHeaders().set('content-type', 'application/json');
        this.store = new CustomStore({
          key: "idCommand",
          load: () => this.commands,
            insert: (values) => this.http.post<any>(this.baseUrl + 'ProgrammCommands/CreateCommand', JSON.stringify(values as IProgrammcommands), { headers: this.headers }).subscribe(
              () => { this.commandService.getCommand(); }),
          update: (key, values) =>
              this.http.put<any>(this.baseUrl + 'ProgrammCommands/UpdateCommand', JSON.stringify(values as IProgrammcommands), { headers: this.headers }).subscribe(
                () => { this.commandService.getCommand(); }),
            remove: (key) => this.http.delete<any>(this.baseUrl + 'ProgrammCommands/DeleteCommand', { params: new HttpParams().set('idCommand', key) }).subscribe(() => { this.commandService.getCommand(); })
        });
    }

    onRowUpdating(e) {
      for (var property in e.oldData) {
        if (!e.newData.hasOwnProperty(property)) {
          e.newData[property] = e.oldData[property];
        }
      }
    }

    commandReceived = (data: IProgrammcommands[]) => {
        this.commands = data;
        this.dataGrid.instance.refresh();
  }

  ngOnInit() {

  }

}
