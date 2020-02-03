import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableTelemetryComponent } from './table-telemetry.component';

describe('TableTelemetryComponent', () => {
  let component: TableTelemetryComponent;
  let fixture: ComponentFixture<TableTelemetryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableTelemetryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableTelemetryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
