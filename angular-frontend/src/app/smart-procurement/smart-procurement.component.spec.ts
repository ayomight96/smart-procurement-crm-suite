import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartProcurementComponent } from './smart-procurement.component';

describe('SmartProcurementComponent', () => {
  let component: SmartProcurementComponent;
  let fixture: ComponentFixture<SmartProcurementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SmartProcurementComponent]
    });
    fixture = TestBed.createComponent(SmartProcurementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
