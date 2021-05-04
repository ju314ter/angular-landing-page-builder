import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TDNPreviewerComponent } from './tdnpreviewer.component';

describe('TDNPreviewerComponent', () => {
  let component: TDNPreviewerComponent;
  let fixture: ComponentFixture<TDNPreviewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TDNPreviewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TDNPreviewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
