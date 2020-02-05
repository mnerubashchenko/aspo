import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class PrCommandsService {
    commands: IProgrammcommands[];
    subject = new Subject<IProgrammcommands[]>();
  constructor(public http: HttpClient, @Inject('BASE_URL') public baseUrl: string ) {

  }

  getCommand() {
      this.http.get<any>(this.baseUrl + 'api/ProgrammCommands/GetCommand').subscribe(result => {
        this.commands = result as IProgrammcommands[];
        this.subject.next(this.commands);
    }, error => console.error(error));
  }
}

export interface IProgrammcommands {
  IdCommand: string;
  CodeCommand: string;
  NameCommand: string;
  PurposeCommand: string;
  DescriptionCommand: string;
  TelemetryCommand: string;
}
