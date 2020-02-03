import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableTypeMeasureComponent } from './table-type-measure.component';

describe('TableTypeMeasureComponent', () => {
  let component: TableTypeMeasureComponent;
  let fixture: ComponentFixture<TableTypeMeasureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableTypeMeasureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableTypeMeasureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
