import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeneficiaireLayoutComponent } from './beneficiaire-layout.component';

describe('BeneficiaireLayoutComponent', () => {
  let component: BeneficiaireLayoutComponent;
  let fixture: ComponentFixture<BeneficiaireLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BeneficiaireLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BeneficiaireLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
