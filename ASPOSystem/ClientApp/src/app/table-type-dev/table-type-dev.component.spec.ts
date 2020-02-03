import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableTypeDevComponent } from './table-type-dev.component';

describe('TableTypeDevComponent', () => {
  let component: TableTypeDevComponent;
  let fixture: ComponentFixture<TableTypeDevComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableTypeDevComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableTypeDevComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
