import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class TelemetryService {
  telemetries: ITelemetry[];
    subject = new Subject<ITelemetry[]>();
    headers: HttpHeaders;
  constructor(public http: HttpClient, @Inject('BASE_URL') public baseUrl: string ) {
    this.headers = new HttpHeaders().set('content-type', 'application/json');
  }

  getTelemetry() {
    this.http.get<any>(this.baseUrl + 'Telemetry/GetTelemetry').subscribe(result => {
        this.telemetries = result as ITelemetry[];
        this.subject.next(this.telemetries);
    }, error => console.error(error));
    }

}

export interface ITelemetry {
  id: string;
  HasItems: string;
  ParentId: string;
  LongName: string;
  shortName: string;
  ByteNumber: number;
  StartBit: number;
  Lenght: number;
  PossibleValues: string;
  Value: string;
}
