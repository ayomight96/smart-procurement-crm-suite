import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SupplierFeatures } from '../../models/supplier.model';

@Component({
  selector: 'app-supplier-form',
  templateUrl: './supplier-form.component.html',
})
export class SupplierFormComponent {
  @Output() formSubmitted = new EventEmitter<SupplierFeatures>();
  supplierForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.supplierForm = this.fb.group({
      supplierName: [null, [Validators.required]],
      averageUnitPrice: [null, [Validators.required]],
      averageDeliveryDays: [null, [Validators.required]],
      rating: [null, [Validators.required]],
      defectRate: [null, [Validators.required]],
    });
  }

  submitForm(): void {
    if (this.supplierForm.valid) {
      this.formSubmitted.emit(this.supplierForm.value);
      this.supplierForm.reset();
    }
  }
}
