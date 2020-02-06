import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class PrCommandsService {
    commands: IProgrammcommands[];
    subject = new Subject<IProgrammcommands[]>();
    headers: HttpHeaders;
  constructor(public http: HttpClient, @Inject('BASE_URL') public baseUrl: string ) {
    this.headers = new HttpHeaders().set('content-type', 'application/json');
  }

  getCommand() {
      this.http.get<any>(this.baseUrl + 'ProgrammCommands/GetCommand').subscribe(result => {
        this.commands = result as IProgrammcommands[];
        this.subject.next(this.commands);
    }, error => console.error(error));
    }

    createCommand(command: IProgrammcommands) {
        return this.http.post<any>(this.baseUrl + 'ProgrammCommands/CreateCommand', JSON.stringify(command), { headers: this.headers });
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
