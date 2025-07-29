import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierResultCardComponent } from './supplier-result-card.component';

describe('SupplierResultCardComponent', () => {
  let component: SupplierResultCardComponent;
  let fixture: ComponentFixture<SupplierResultCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SupplierResultCardComponent]
    });
    fixture = TestBed.createComponent(SupplierResultCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
