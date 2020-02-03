import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableBrandsComponent } from './table-brands.component';

describe('TableBrandsComponent', () => {
  let component: TableBrandsComponent;
  let fixture: ComponentFixture<TableBrandsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableBrandsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableBrandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
