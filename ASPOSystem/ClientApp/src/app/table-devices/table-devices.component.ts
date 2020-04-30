import { Component, enableProdMode, ViewChild, Inject } from '@angular/core';
import { IDevice, DevicesService } from '../table-devices/DevicesService';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import CustomStore from "devextreme/data/custom_store";
import { DxDataGridComponent } from 'devextreme-angular';
import { IBrands, BrandService } from '../table-brands/BrandService';
import { ITypedev, TypedevService } from '../table-type-dev/TypedevService';

@Component({
    selector: 'app-table-devices',
    templateUrl: './table-devices.component.html',
    styleUrls: ['./table-devices.component.css']
})
export class TableDevicesComponent {
    public devices: IDevice[];
    public brands: IBrands[];
    public types: ITypedev[];
    @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;
    store: any;
    headers: HttpHeaders;
    constructor(private deviceService: DevicesService,
        private brandsService: BrandService, private typedevService: TypedevService, 
        public http: HttpClient, @Inject('BASE_URL') public baseUrl: string) {
        sessionStorage.setItem("locale", 'ru');

        this.deviceService.subject.subscribe(this.devicesReceived);
        this.deviceService.getDevices();

        this.brandsService.subject.subscribe(this.brandReceived);
        this.brandsService.getBrands();

        this.typedevService.subject.subscribe(this.typedevReceived);
        this.typedevService.getTypedev();

        this.baseUrl = baseUrl;
        this.headers = new HttpHeaders().set('content-type', 'application/json');
        setTimeout(() => {
            this.store = new CustomStore({
                key: "id",
                load: () => this.devices,
                insert: (values) => this.http.post<any>(this.baseUrl + 'Devices/CreateDevice', JSON.stringify(values as IDevice), { headers: this.headers }).subscribe(
                    () => { this.deviceService.getDevices(); }),
                update: (key, values) =>
                    this.http.put<any>(this.baseUrl + 'Devices/UpdateDevice', JSON.stringify(values as IDevice), { headers: this.headers }).subscribe(
                        () => { this.deviceService.getDevices(); }),
                remove: (key) => this.http.delete<any>(this.baseUrl + 'Devices/DeleteDevice', { params: new HttpParams().set('idDevice', key) }).subscribe(() => { this.deviceService.getDevices(); })
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

    devicesReceived = (data: IDevice[]) => {
        this.devices = data;
        this.dataGrid.instance.refresh();
    }

    brandReceived = (data2: IBrands[]) => {
        this.brands = data2;
        this.dataGrid.instance.refresh();
    }

    typedevReceived = (data2: ITypedev[]) => {
      this.types = data2;
      this.dataGrid.instance.refresh();
    }

    ngOnInit() {

    }

}
