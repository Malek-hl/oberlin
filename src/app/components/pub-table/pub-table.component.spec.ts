import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PubTableComponent } from './pub-table.component';

describe('PubTableComponent', () => {
  let component: PubTableComponent;
  let fixture: ComponentFixture<PubTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PubTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PubTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
