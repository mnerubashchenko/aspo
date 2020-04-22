import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JsonMakerComponent } from './json-maker.component';

describe('JsonMakerComponent', () => {
  let component: JsonMakerComponent;
  let fixture: ComponentFixture<JsonMakerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JsonMakerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JsonMakerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
