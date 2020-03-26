import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DragExchangeComponent } from './drag-exchange.component';

describe('DragExchangeComponent', () => {
  let component: DragExchangeComponent;
  let fixture: ComponentFixture<DragExchangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DragExchangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DragExchangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
