import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParamSectionComponent } from './param-section.component';

describe('ParamSectionComponent', () => {
  let component: ParamSectionComponent;
  let fixture: ComponentFixture<ParamSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParamSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParamSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
