import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableProjectCommandComponent } from './table-project-command.component';

describe('TableProjectCommandComponent', () => {
  let component: TableProjectCommandComponent;
  let fixture: ComponentFixture<TableProjectCommandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableProjectCommandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableProjectCommandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
