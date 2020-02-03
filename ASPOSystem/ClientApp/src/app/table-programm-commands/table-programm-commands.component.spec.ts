import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableProgrammCommandsComponent } from './table-programm-commands.component';

describe('TableProgrammCommandsComponent', () => {
  let component: TableProgrammCommandsComponent;
  let fixture: ComponentFixture<TableProgrammCommandsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableProgrammCommandsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableProgrammCommandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
