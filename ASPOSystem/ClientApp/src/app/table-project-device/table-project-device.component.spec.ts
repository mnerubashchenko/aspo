import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableProjectDeviceComponent } from './table-project-device.component';

describe('TableProjectDeviceComponent', () => {
  let component: TableProjectDeviceComponent;
  let fixture: ComponentFixture<TableProjectDeviceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableProjectDeviceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableProjectDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
