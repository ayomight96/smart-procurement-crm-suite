import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PredictionResult, SupplierComparisonResponse, SupplierFeatures, SupplierPair } from '../models/supplier.model';

@Injectable({
  providedIn: 'root',
})
export class ProcurementApiService {
  private readonly apiUrl = 'http://localhost:5053'; // change if different

  constructor(private http: HttpClient) {}

  predictSupplier(features: SupplierFeatures): Observable<PredictionResult> {
    return this.http.post<PredictionResult>(`${this.apiUrl}/Predict/predict`, features);
  }

  compareSuppliers(
    suppliers: SupplierPair
  ): Observable<SupplierComparisonResponse> {
    return this.http.post<SupplierComparisonResponse>(
      `${this.apiUrl}/compare-suppliers`,
      suppliers
    );
  }
}
