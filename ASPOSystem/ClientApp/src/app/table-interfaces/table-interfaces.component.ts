import { Component, enableProdMode, ViewChild, Inject } from '@angular/core';
import { IInterface, InterfaceService } from '../table-interfaces/InterfaceService';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import CustomStore from "devextreme/data/custom_store";
import { DxDataGridComponent } from 'devextreme-angular';
import { ITypeinter, TypeinterService } from '../table-type-inter/TypeinterService';

@Component({
    selector: 'app-table-interfaces',
    templateUrl: './table-interfaces.component.html',
    styleUrls: ['./table-interfaces.component.css']
})
export class TableInterfacesComponent {
    public interfaces: IInterface[];
    public types: ITypeinter[];
    @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;
    store: any;
    headers: HttpHeaders;
    constructor(private interfaceService: InterfaceService, private typeinterService: TypeinterService,
        public http: HttpClient, @Inject('BASE_URL') public baseUrl: string) {
        sessionStorage.setItem("locale", 'ru');

        this.interfaceService.subject.subscribe(this.interfaceReceived);
        this.interfaceService.getInterfaces();

        this.typeinterService.subject.subscribe(this.typeinterReceived);
        this.typeinterService.getTypeinter();


        this.baseUrl = baseUrl;
        this.headers = new HttpHeaders().set('content-type', 'application/json');
        setTimeout(() => {
            this.store = new CustomStore({
                key: "id",
                load: () => this.interfaces,
                insert: (values) => this.http.post<any>(this.baseUrl + 'Interface/CreateInterface', JSON.stringify(values as IInterface), { headers: this.headers }).subscribe(
                    () => { this.interfaceService.getInterfaces(); }),
                update: (key, values) =>
                    this.http.put<any>(this.baseUrl + 'Interface/UpdateInterface', JSON.stringify(values as IInterface), { headers: this.headers }).subscribe(
                        () => { this.interfaceService.getInterfaces(); }),
                remove: (key) => this.http.delete<any>(this.baseUrl + 'Interface/DeleteInterface', { params: new HttpParams().set('idInterface', key) }).subscribe(() => { this.interfaceService.getInterfaces(); })
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

    interfaceReceived = (data: IInterface[]) => {
        this.interfaces = data;
        this.dataGrid.instance.refresh();
    }

    typeinterReceived = (data1: ITypeinter[]) => {
        this.types = data1;
        this.dataGrid.instance.refresh();
    }

    ngOnInit() {

    }

}
