import { Component, enableProdMode, ViewChild, Inject } from '@angular/core';
import { IProtocol, ProtocolService } from './ProtocolService';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import CustomStore from "devextreme/data/custom_store";
import { DxDataGridComponent } from 'devextreme-angular';


@Component({
    selector: 'app-table-protocol',
    templateUrl: './table-protocol.component.html',
    styleUrls: ['./table-protocol.component.css']
})
export class TableProtocolComponent {
    public protocols: IProtocol[];
    @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;
    store: any;
    headers: HttpHeaders;
    constructor(private protocolService: ProtocolService, public http: HttpClient, @Inject('BASE_URL') public baseUrl: string) {
        sessionStorage.setItem("locale", 'ru');
        this.protocolService.subject.subscribe(this.protocolReceived);
        this.protocolService.getProtocols();
        this.baseUrl = baseUrl;
        this.headers = new HttpHeaders().set('content-type', 'application/json');
        this.store = new CustomStore({
            key: "idProtocol",
            load: () => this.protocols,
            insert: (values) => this.http.post<any>(this.baseUrl + 'Protocol/CreateProtocol', JSON.stringify(values as IProtocol), { headers: this.headers }).subscribe(
                () => { this.protocolService.getProtocols(); }),
            update: (key, values) =>
                this.http.put<any>(this.baseUrl + 'Protocol/UpdateProtocol', JSON.stringify(values as IProtocol), { headers: this.headers }).subscribe(
                    () => { this.protocolService.getProtocols(); }),
            remove: (key) => this.http.delete<any>(this.baseUrl + 'Protocol/DeleteProtocol', { params: new HttpParams().set('idProtocol', key) }).subscribe(() => { this.protocolService.getProtocols(); })
        });
    }

    onRowUpdating(e) {
        for (var property in e.oldData) {
            if (!e.newData.hasOwnProperty(property)) {
                e.newData[property] = e.oldData[property];
            }
        }
    }

    protocolReceived = (data: IProtocol[]) => {
        this.protocols = data;
        this.dataGrid.instance.refresh();
    }

    ngOnInit() {

    }

}
