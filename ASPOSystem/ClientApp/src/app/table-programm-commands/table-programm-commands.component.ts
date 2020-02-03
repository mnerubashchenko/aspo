import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-table-programm-commands',
  templateUrl: './table-programm-commands.component.html',
  styleUrls: ['./table-programm-commands.component.css']
})
export class TableProgrammCommandsComponent {
    public commands: IProgrammcommands[];
  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<any>(baseUrl + 'api/Programmcommands/GetCommand').subscribe(result => {
        this.commands = result as IProgrammcommands[];
    }, error => console.error(error));
  }

  ngOnInit() {
  }

}

interface IProgrammcommands {
    IdCommand: string;
    CodeCommand: string;
    NameCommand: string;
    PurposeCommand: string;
    DescriptionCommand: string;
    TelemetryCommand: string;
}
