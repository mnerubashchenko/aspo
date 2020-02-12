import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableProtocolComponent } from './table-protocol.component';

describe('TableProtocolComponent', () => {
  let component: TableProtocolComponent;
  let fixture: ComponentFixture<TableProtocolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableProtocolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableProtocolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
