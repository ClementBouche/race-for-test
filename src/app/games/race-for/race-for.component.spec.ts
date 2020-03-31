import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaceForComponent } from './race-for.component';

describe('RaceForComponent', () => {
  let component: RaceForComponent;
  let fixture: ComponentFixture<RaceForComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaceForComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaceForComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
