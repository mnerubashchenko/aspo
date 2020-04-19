import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableProjectTelemetryComponent } from './table-project-telemetry.component';

describe('TableProjectTelemetryComponent', () => {
  let component: TableProjectTelemetryComponent;
  let fixture: ComponentFixture<TableProjectTelemetryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableProjectTelemetryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableProjectTelemetryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
