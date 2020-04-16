import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableProjectMeasureComponent } from './table-project-measure.component';

describe('TableProjectMeasureComponent', () => {
  let component: TableProjectMeasureComponent;
  let fixture: ComponentFixture<TableProjectMeasureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableProjectMeasureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableProjectMeasureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
