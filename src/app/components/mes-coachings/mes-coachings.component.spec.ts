import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesCoachingsComponent } from './mes-coachings.component';

describe('MesCoachingsComponent', () => {
  let component: MesCoachingsComponent;
  let fixture: ComponentFixture<MesCoachingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MesCoachingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MesCoachingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
