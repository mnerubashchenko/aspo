import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableTypeInterComponent } from './table-type-inter.component';

describe('TableTypeInterComponent', () => {
  let component: TableTypeInterComponent;
  let fixture: ComponentFixture<TableTypeInterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableTypeInterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableTypeInterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
