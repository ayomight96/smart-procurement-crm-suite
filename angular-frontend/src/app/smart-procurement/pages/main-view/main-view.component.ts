import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ProcurementApiService } from '../../services/procurement-api.service';
import {
  PredictionResult,
  SupplierFeatures,
} from '../../models/supplier.model';
import { generateMockBid } from '../../mock/bid-generator';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class MainViewComponent implements OnInit {
  selectedForComparison: PredictionResult[] = [];
  predictionResult?: PredictionResult;
  lastBid?: SupplierFeatures;
  bidHistory: SupplierFeatures[] = [];
  batchResults: PredictionResult[] = [];
  isLoading = false;
  showComparisonView = false;
  activeTabIndex: number = 0;

  constructor(private api: ProcurementApiService) {}

  ngOnInit(): void {
    this.autoSubmitBid();
    this.generateBatch();
  }

  autoSubmitBid(): void {
    const mockBid = generateMockBid();
    this.lastBid = mockBid;

    this.bidHistory.unshift(mockBid);
    if (this.bidHistory.length > 10) {
      this.bidHistory = this.bidHistory.slice(0, 10);
    }

    this.api.predictSupplier(mockBid).subscribe((result) => {
      this.predictionResult = {
        ...result,
        supplierName: mockBid.supplierName,
      };
    });
  }

  generateBatch(): void {
    const batch = Array.from({ length: 5 }, () => generateMockBid());

    this.bidHistory.unshift(...batch);
    if (this.bidHistory.length > 10) {
      this.bidHistory = this.bidHistory.slice(0, 10);
    }

    const requests = batch.map((bid) => this.api.predictSupplier(bid));
    this.isLoading = true;

    forkJoin(requests).subscribe((results) => {
      this.batchResults = results
        .map((res, i) => ({
          ...res,
          supplierName: batch[i].supplierName,
        }))
        .sort((a, b) => b.probability - a.probability);
      this.isLoading = false;
    });
  }

  trackBySupplierName(index: number, item: PredictionResult): string {
    return item.supplierName;
  }

  handleCompare(bids: PredictionResult[]): void {
    this.selectedForComparison = bids;
    this.showComparisonView = true;
  }

  handleCloseComparison(): void {
    this.showComparisonView = false;
    this.selectedForComparison = [];
  }
}
