import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeneficiairesComponent } from './beneficiaires.component';

describe('BeneficiairesComponent', () => {
  let component: BeneficiairesComponent;
  let fixture: ComponentFixture<BeneficiairesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BeneficiairesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BeneficiairesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
