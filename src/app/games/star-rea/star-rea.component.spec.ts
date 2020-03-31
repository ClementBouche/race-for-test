import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StarReaComponent } from './star-rea.component';

describe('StarReaComponent', () => {
  let component: StarReaComponent;
  let fixture: ComponentFixture<StarReaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StarReaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StarReaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
