import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableProjectInterfaceComponent } from './table-project-interface.component';

describe('TableProjectInterfaceComponent', () => {
  let component: TableProjectInterfaceComponent;
  let fixture: ComponentFixture<TableProjectInterfaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableProjectInterfaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableProjectInterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
