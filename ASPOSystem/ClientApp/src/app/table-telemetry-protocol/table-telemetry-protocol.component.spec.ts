import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableTelemetryProtocolComponent } from './table-telemetry-protocol.component';

describe('TableTelemetryProtocolComponent', () => {
  let component: TableTelemetryProtocolComponent;
  let fixture: ComponentFixture<TableTelemetryProtocolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableTelemetryProtocolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableTelemetryProtocolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
