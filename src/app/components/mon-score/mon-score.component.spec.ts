import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonScoreComponent } from './mon-score.component';

describe('MonScoreComponent', () => {
  let component: MonScoreComponent;
  let fixture: ComponentFixture<MonScoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonScoreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
