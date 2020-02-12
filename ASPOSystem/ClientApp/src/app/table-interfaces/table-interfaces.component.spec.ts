import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableInterfacesComponent } from './table-interfaces.component';

describe('TableInterfacesComponent', () => {
  let component: TableInterfacesComponent;
  let fixture: ComponentFixture<TableInterfacesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableInterfacesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableInterfacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
