import { Component, enableProdMode, ViewChild, Inject } from '@angular/core';
import { IDevicesMeasure, DevicesMeasureService } from '../table-devices-measure/DevicesMeasureService';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import CustomStore from "devextreme/data/custom_store";
import { DxDataGridComponent } from 'devextreme-angular';
import { IDevice, DevicesService } from '../table-devices/DevicesService';
import { IMeasure, MeasureService } from '../table-measures/MeasureService';

@Component({
    selector: 'app-table-devices-measure',
    templateUrl: './table-devices-measure.component.html',
    styleUrls: ['./table-devices-measure.component.css']
})
export class TableDevicesMeasureComponent {
    public links: IDevicesMeasure[];
    public devices: IDevice[];
    public measures: IMeasure[];
    @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;
    store: any;
    headers: HttpHeaders;
    constructor(private devicesMeasureService: DevicesMeasureService, private devicesService: DevicesService, private measureService: MeasureService,
        public http: HttpClient, @Inject('BASE_URL') public baseUrl: string) {
        sessionStorage.setItem("locale", 'ru');

        this.devicesMeasureService.subject.subscribe(this.linksReceived);
        this.devicesMeasureService.getLinks();

        this.devicesService.subject.subscribe(this.devicesReceived);
        this.devicesService.getDevices();

        this.measureService.subject.subscribe(this.measuresReceived);
        this.measureService.getMeasures();

        this.baseUrl = baseUrl;
        this.headers = new HttpHeaders().set('content-type', 'application/json');
        setTimeout(() => {
            this.store = new CustomStore({
                key: "idDevmeas",
                load: () => this.links,
                insert: (values) => this.http.post<any>(this.baseUrl + 'DevicesMeasure/CreateLink', JSON.stringify(values as IDevicesMeasure), { headers: this.headers }).subscribe(
                    () => { this.devicesMeasureService.getLinks(); }),
                update: (key, values) =>
                    this.http.put<any>(this.baseUrl + 'DevicesMeasure/UpdateLink', JSON.stringify(values as IDevicesMeasure), { headers: this.headers }).subscribe(
                        () => { this.devicesMeasureService.getLinks(); }),
                remove: (key) => this.http.delete<any>(this.baseUrl + 'DevicesMeasure/' + key, {}).subscribe(() => { this.devicesMeasureService.getLinks(); })
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

    linksReceived = (data: IDevicesMeasure[]) => {
        this.links = data;
        this.dataGrid.instance.refresh();
    }

    devicesReceived = (data1: IDevice[]) => {
        this.devices = data1;
        this.dataGrid.instance.refresh();
    }

    measuresReceived = (data2: IMeasure[]) => {
        this.measures = data2;
        this.dataGrid.instance.refresh();
    }

    ngOnInit() {

    }

}
