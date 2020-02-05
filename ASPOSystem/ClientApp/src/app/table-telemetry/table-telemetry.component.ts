import { Component, Inject, OnInit } from '@angular/core';
import { ITelemetry, TelemetryService } from './TelemetryService';

@Component({
  selector: 'app-table-telemetry',
  templateUrl: './table-telemetry.component.html',
  styleUrls: ['./table-telemetry.component.css']
})
export class TableTelemetryComponent {
  public telemetries: ITelemetry[];
  constructor(private telemetryService: TelemetryService) {
      this.telemetryService.subject.subscribe(this.telemetryReceived);
  }

    telemetryReceived = (data: ITelemetry[]) => {
      this.telemetries = data;
  }

  ngOnInit() {
      this.telemetryService.getTelemetry();
  }

}

