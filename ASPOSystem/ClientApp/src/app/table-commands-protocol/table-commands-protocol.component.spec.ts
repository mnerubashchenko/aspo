import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableCommandsProtocolComponent } from './table-commands-protocol.component';

describe('TableCommandsProtocolComponent', () => {
  let component: TableCommandsProtocolComponent;
  let fixture: ComponentFixture<TableCommandsProtocolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableCommandsProtocolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableCommandsProtocolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
