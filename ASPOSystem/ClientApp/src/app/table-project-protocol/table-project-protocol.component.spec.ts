import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableProjectProtocolComponent } from './table-project-protocol.component';

describe('TableProjectProtocolComponent', () => {
  let component: TableProjectProtocolComponent;
  let fixture: ComponentFixture<TableProjectProtocolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableProjectProtocolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableProjectProtocolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
