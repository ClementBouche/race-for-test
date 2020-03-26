import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleDragComponent } from './simple-drag.component';

describe('SimpleDragComponent', () => {
  let component: SimpleDragComponent;
  let fixture: ComponentFixture<SimpleDragComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleDragComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleDragComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
