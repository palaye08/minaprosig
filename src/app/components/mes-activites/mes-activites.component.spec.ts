import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesActivitesComponent } from './mes-activites.component';

describe('MesActivitesComponent', () => {
  let component: MesActivitesComponent;
  let fixture: ComponentFixture<MesActivitesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MesActivitesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MesActivitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
