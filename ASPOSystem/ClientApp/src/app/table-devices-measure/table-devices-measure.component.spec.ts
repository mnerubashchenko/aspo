import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableDevicesMeasureComponent } from './table-devices-measure.component';

describe('TableDevicesMeasureComponent', () => {
  let component: TableDevicesMeasureComponent;
  let fixture: ComponentFixture<TableDevicesMeasureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableDevicesMeasureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableDevicesMeasureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
