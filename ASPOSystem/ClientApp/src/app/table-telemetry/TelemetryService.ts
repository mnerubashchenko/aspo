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

  createCommand(telemetry: ITelemetry) {
      return this.http.post<any>(this.baseUrl + 'Telemetry/CreateTelemetry', JSON.stringify(telemetry), { headers: this.headers });
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
