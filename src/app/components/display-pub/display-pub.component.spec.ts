import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayPubComponent } from './display-pub.component';

describe('DisplayPubComponent', () => {
  let component: DisplayPubComponent;
  let fixture: ComponentFixture<DisplayPubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayPubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayPubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
