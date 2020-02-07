import { Component, enableProdMode, ViewChild, Inject } from '@angular/core';
import { ITelemetry, TelemetryService } from './TelemetryService';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import CustomStore from "devextreme/data/custom_store";
import { DxDataGridComponent } from 'devextreme-angular';

@Component({
  selector: 'app-table-telemetry',
  templateUrl: './table-telemetry.component.html',
  styleUrls: ['./table-telemetry.component.css']
})
export class TableTelemetryComponent {
    public telemetries: ITelemetry[];
    @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;
    store: any;
    headers: HttpHeaders;
    constructor(private telemetryService: TelemetryService, public http: HttpClient, @Inject('BASE_URL') public baseUrl: string) {
        sessionStorage.setItem("locale", 'ru');
        this.telemetryService.subject.subscribe(this.telemetryReceived);
        this.telemetryService.getTelemetry();
        this.baseUrl = baseUrl;
        this.headers = new HttpHeaders().set('content-type', 'application/json');
        this.store = new CustomStore({
          key: "idTelemetry",
            load: () => this.telemetries,
            insert: (values) => this.http.post<any>(this.baseUrl + 'Telemetry/CreateTelemetry', JSON.stringify(values as ITelemetry), { headers: this.headers }).subscribe(
              () => { this.telemetryService.getTelemetry(); }),
          update: (key, values) =>
              this.http.put<any>(this.baseUrl + 'Telemetry/UpdateTelemetry', JSON.stringify(values as ITelemetry), { headers: this.headers }).subscribe(
                  () => { this.telemetryService.getTelemetry(); }),
            remove: (key) => this.http.delete<any>(this.baseUrl + 'Telemetry/DeleteTelemetry', { params: new HttpParams().set('idTelemetry', key) }).subscribe(() => { this.telemetryService.getTelemetry(); })
        });
    }

    onRowUpdating(e) {
      for (var property in e.oldData) {
        if (!e.newData.hasOwnProperty(property)) {
          e.newData[property] = e.oldData[property];
        }
      }
    }

    telemetryReceived = (data: ITelemetry[]) => {
        this.telemetries = data;
        this.dataGrid.instance.refresh();
  }

  ngOnInit() {

  }

}

