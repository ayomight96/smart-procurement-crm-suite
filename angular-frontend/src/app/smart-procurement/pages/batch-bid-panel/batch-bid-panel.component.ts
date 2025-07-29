import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PredictionResult } from '../../models/supplier.model';

@Component({
  selector: 'app-batch-bid-panel',
  templateUrl: './batch-bid-panel.component.html',
})
export class BatchBidPanelComponent {
  @Input() batchResults: PredictionResult[] = [];
  @Input() selectedForComparison: PredictionResult[] = [];
  @Input() showComparisonView = false;
  @Input() generateBatch!: () => void;

  @Output() compare = new EventEmitter<PredictionResult[]>();
  @Output() closeComparison = new EventEmitter<void>();
}
