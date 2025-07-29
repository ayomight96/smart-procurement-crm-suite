import { Component, Input } from '@angular/core';
import { PredictionResult, SupplierFeatures } from '../../models/supplier.model';

@Component({
  selector: 'app-single-bid-panel',
  templateUrl: './single-bid-panel.component.html',
})
export class SingleBidPanelComponent {
  @Input() lastBid?: SupplierFeatures;
  @Input() predictionResult?: PredictionResult;
  @Input() generateBid!: () => void;
}
