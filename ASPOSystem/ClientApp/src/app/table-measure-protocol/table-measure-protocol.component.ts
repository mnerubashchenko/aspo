import { Component, enableProdMode, ViewChild, Inject } from '@angular/core';
import { IMeasureProtocol, MeasureProtocolService } from '../table-measure-protocol/MeasureProtocolService';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import CustomStore from "devextreme/data/custom_store";
import { DxDataGridComponent } from 'devextreme-angular';
import { IProtocol, ProtocolService } from '../table-protocol/ProtocolService';
import { IMeasure, MeasureService } from '../table-measures/MeasureService';

@Component({
    selector: 'app-table-measure-protocol',
    templateUrl: './table-measure-protocol.component.html',
    styleUrls: ['./table-measure-protocol.component.css']
})
export class TableMeasureProtocolComponent {
    public links: IMeasureProtocol[];
    public protocols: IProtocol[];
    public measures: IMeasure[];
    @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;
    store: any;
    headers: HttpHeaders;
    constructor(private measureProtocolService: MeasureProtocolService, private protocolService: ProtocolService, private measureService: MeasureService,
        public http: HttpClient, @Inject('BASE_URL') public baseUrl: string) {
        sessionStorage.setItem("locale", 'ru');

        this.measureProtocolService.subject.subscribe(this.linksReceived);
        this.measureProtocolService.getLinks();

        this.protocolService.subject.subscribe(this.protocolsReceived);
        this.protocolService.getProtocols();

        this.measureService.subject.subscribe(this.measuresReceived);
        this.measureService.getMeasures();

        this.baseUrl = baseUrl;
        this.headers = new HttpHeaders().set('content-type', 'application/json');
        setTimeout(() => {
            this.store = new CustomStore({
                key: "idMeasprot",
                load: () => this.links,
                insert: (values) => this.http.post<any>(this.baseUrl + 'MeasureProtocol/CreateLink', JSON.stringify(values as IMeasureProtocol), { headers: this.headers }).subscribe(
                    () => { this.measureProtocolService.getLinks(); }),
                update: (key, values) =>
                    this.http.put<any>(this.baseUrl + 'MeasureProtocol/UpdateLink', JSON.stringify(values as IMeasureProtocol), { headers: this.headers }).subscribe(
                        () => { this.measureProtocolService.getLinks(); }),
                remove: (key) => this.http.delete<any>(this.baseUrl + 'MeasureProtocol/' + key, {}).subscribe(() => { this.measureProtocolService.getLinks(); })
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

    linksReceived = (data: IMeasureProtocol[]) => {
        this.links = data;
        this.dataGrid.instance.refresh();
    }

    protocolsReceived = (data1: IProtocol[]) => {
        this.protocols = data1;
        this.dataGrid.instance.refresh();
    }

    measuresReceived = (data2: IMeasure[]) => {
        this.measures = data2;
        this.dataGrid.instance.refresh();
    }

    ngOnInit() {

    }

}
