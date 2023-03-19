import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayAccomComponent } from './display-accom.component';

describe('DisplayAccomComponent', () => {
  let component: DisplayAccomComponent;
  let fixture: ComponentFixture<DisplayAccomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayAccomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayAccomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
