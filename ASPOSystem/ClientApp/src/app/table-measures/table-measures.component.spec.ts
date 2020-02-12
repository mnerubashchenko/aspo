import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableMeasuresComponent } from './table-measures.component';

describe('TableMeasuresComponent', () => {
  let component: TableMeasuresComponent;
  let fixture: ComponentFixture<TableMeasuresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableMeasuresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableMeasuresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
