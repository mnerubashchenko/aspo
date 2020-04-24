import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectChangerComponent } from './project-changer.component';

describe('ProjectChangerComponent', () => {
  let component: ProjectChangerComponent;
  let fixture: ComponentFixture<ProjectChangerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectChangerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectChangerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
