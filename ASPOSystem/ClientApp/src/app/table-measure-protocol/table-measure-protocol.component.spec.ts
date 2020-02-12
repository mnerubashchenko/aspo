import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableMeasureProtocolComponent } from './table-measure-protocol.component';

describe('TableMeasureProtocolComponent', () => {
  let component: TableMeasureProtocolComponent;
  let fixture: ComponentFixture<TableMeasureProtocolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableMeasureProtocolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableMeasureProtocolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
