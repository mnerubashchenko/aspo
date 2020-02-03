import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-table-telemetry',
  templateUrl: './table-telemetry.component.html',
  styleUrls: ['./table-telemetry.component.css']
})
export class TableTelemetryComponent {
    public telemetries: ITelemetry[];
  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<any>(baseUrl + 'api/Telemetry/GetTelemetry').subscribe(result => {
        this.telemetries = result as ITelemetry[];
    }, error => console.error(error));
  }

  ngOnInit() {
  }

}

interface ITelemetry {
    IdTelemetry: string;
    LongNameTelemetry: string;
    ShortNameTelemetry: string;
    ByteNumberTelemetry: number;
    StartBitTelemetry: number;
    LenghtTelemetry: number;
    PossibleValuesTelemetry: string;
}
