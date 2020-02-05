import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class TelemetryService {
  telemetries: ITelemetry[];
    subject = new Subject<ITelemetry[]>();
  constructor(public http: HttpClient, @Inject('BASE_URL') public baseUrl: string ) {

  }

  getTelemetry() {
    this.http.get<any>(this.baseUrl + 'api/Telemetry/GetTelemetry').subscribe(result => {
        this.telemetries = result as ITelemetry[];
        this.subject.next(this.telemetries);
    }, error => console.error(error));
  }
}

export interface ITelemetry {
  IdTelemetry: string;
  LongNameTelemetry: string;
  ShortNameTelemetry: string;
  ByteNumberTelemetry: number;
  StartBitTelemetry: number;
  LenghtTelemetry: number;
  PossibleValuesTelemetry: string;
}
