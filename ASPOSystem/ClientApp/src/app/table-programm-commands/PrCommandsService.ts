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
}

export interface IProgrammcommands {
  Id: string;
  Name: string;
  Code: string;
  LongName: string;
  Device: string;
}
