import { Component, enableProdMode, ViewChild, Inject } from '@angular/core';
import { ITelemetryProtocol, TelemetryProtocolService } from '../table-telemetry-protocol/TelemetryProtocolService';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import CustomStore from "devextreme/data/custom_store";
import { DxDataGridComponent } from 'devextreme-angular';
import { IProtocol, ProtocolService } from '../table-protocol/ProtocolService';
import { ITelemetry, TelemetryService } from '../table-telemetry/TelemetryService';

@Component({
    selector: 'app-table-telemetry-protocol',
    templateUrl: './table-telemetry-protocol.component.html',
    styleUrls: ['./table-telemetry-protocol.component.css']
})
export class TableTelemetryProtocolComponent {
    public links: ITelemetryProtocol[];
    public protocols: IProtocol[];
    public telemetries: ITelemetry[];
    @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;
    store: any;
    headers: HttpHeaders;
    constructor(private telemetryProtocolService: TelemetryProtocolService, private protocolService: ProtocolService, private telemetryService: TelemetryService,
        public http: HttpClient, @Inject('BASE_URL') public baseUrl: string) {
        sessionStorage.setItem("locale", 'ru');

        this.telemetryProtocolService.subject.subscribe(this.linksReceived);
        this.telemetryProtocolService.getLinks();

        this.protocolService.subject.subscribe(this.protocolsReceived);
        this.protocolService.getProtocols();

        this.telemetryService.subject.subscribe(this.telemetryReceived);
        this.telemetryService.getTelemetry();

        this.baseUrl = baseUrl;
        this.headers = new HttpHeaders().set('content-type', 'application/json');
        setTimeout(() => {
            this.store = new CustomStore({
                key: "idTelprot",
                load: () => this.links,
                insert: (values) => this.http.post<any>(this.baseUrl + 'TelemetryProtocol/CreateLink', JSON.stringify(values as ITelemetryProtocol), { headers: this.headers }).subscribe(
                    () => { this.telemetryProtocolService.getLinks(); }),
                update: (key, values) =>
                    this.http.put<any>(this.baseUrl + 'TelemetryProtocol/UpdateLink', JSON.stringify(values as ITelemetryProtocol), { headers: this.headers }).subscribe(
                        () => { this.telemetryProtocolService.getLinks(); }),
                remove: (key) => this.http.delete<any>(this.baseUrl + 'TelemetryProtocol/' + key, {}).subscribe(() => { this.telemetryProtocolService.getLinks(); })
            });
        }, 1000);

    }

    onRowUpdating(e) {
        for (var property in e.oldData) {
            if (!e.newData.hasOwnProperty(property)) {
                e.newData[property] = e.oldData[property];
            }
        }
    }

    linksReceived = (data: ITelemetryProtocol[]) => {
        this.links = data;
        this.dataGrid.instance.refresh();
    }

    protocolsReceived = (data1: IProtocol[]) => {
        this.protocols = data1;
        this.dataGrid.instance.refresh();
    }

    telemetryReceived = (data2: ITelemetry[]) => {
        this.telemetries = data2;
        this.dataGrid.instance.refresh();
    }

    ngOnInit() {

    }

}
