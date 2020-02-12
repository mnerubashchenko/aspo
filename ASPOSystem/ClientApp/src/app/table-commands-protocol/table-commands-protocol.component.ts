import { Component, enableProdMode, ViewChild, Inject } from '@angular/core';
import { ICommandsProtocol, CommandsProtocolService } from '../table-commands-protocol/CommandsProtocolService';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import CustomStore from "devextreme/data/custom_store";
import { DxDataGridComponent } from 'devextreme-angular';
import { IProtocol, ProtocolService } from '../table-protocol/ProtocolService';
import { IProgrammcommands, PrCommandsService } from '../table-programm-commands/PrCommandsService';

@Component({
    selector: 'app-table-commands-protocol',
    templateUrl: './table-commands-protocol.component.html',
    styleUrls: ['./table-commands-protocol.component.css']
})
export class TableCommandsProtocolComponent {
    public links: ICommandsProtocol[];
    public protocols: IProtocol[];
    public commands: IProgrammcommands[];
    @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;
    store: any;
    headers: HttpHeaders;
    constructor(private commandProtocolService: CommandsProtocolService, private protocolService: ProtocolService, private commandService: PrCommandsService,
        public http: HttpClient, @Inject('BASE_URL') public baseUrl: string) {
        sessionStorage.setItem("locale", 'ru');

        this.commandProtocolService.subject.subscribe(this.linksReceived);
        this.commandProtocolService.getLinks();

        this.protocolService.subject.subscribe(this.protocolsReceived);
        this.protocolService.getProtocols();

        this.commandService.subject.subscribe(this.commandReceived);
        this.commandService.getCommand();

        this.baseUrl = baseUrl;
        this.headers = new HttpHeaders().set('content-type', 'application/json');
        setTimeout(() => {
            this.store = new CustomStore({
                key: "idPrcprot",
                load: () => this.links,
                insert: (values) => this.http.post<any>(this.baseUrl + 'CommandsProtocol/CreateLink', JSON.stringify(values as ICommandsProtocol), { headers: this.headers }).subscribe(
                    () => { this.commandProtocolService.getLinks(); }),
                update: (key, values) =>
                    this.http.put<any>(this.baseUrl + 'CommandsProtocol/UpdateLink', JSON.stringify(values as ICommandsProtocol), { headers: this.headers }).subscribe(
                        () => { this.commandProtocolService.getLinks(); }),
                remove: (key) => this.http.delete<any>(this.baseUrl + 'CommandsProtocol/' + key, {}).subscribe(() => { this.commandProtocolService.getLinks(); })
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

    linksReceived = (data: ICommandsProtocol[]) => {
        this.links = data;
        this.dataGrid.instance.refresh();
    }

    protocolsReceived = (data1: IProtocol[]) => {
        this.protocols = data1;
        this.dataGrid.instance.refresh();
    }

    commandReceived = (data2: IProgrammcommands[]) => {
        this.commands = data2;
        this.dataGrid.instance.refresh();
    }

    ngOnInit() {

    }

}
