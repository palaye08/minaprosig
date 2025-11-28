import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesObjectifsComponent } from './mes-objectifs.component';

describe('MesObjectifsComponent', () => {
  let component: MesObjectifsComponent;
  let fixture: ComponentFixture<MesObjectifsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MesObjectifsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MesObjectifsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
