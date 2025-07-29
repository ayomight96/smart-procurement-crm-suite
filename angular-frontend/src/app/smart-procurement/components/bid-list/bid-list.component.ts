import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PredictionResult } from '../../models/supplier.model';

@Component({
  selector: 'app-bid-list',
  templateUrl: './bid-list.component.html',
  styleUrls: ['./bid-list.component.css'],
})
export class BidListComponent {
  @Input() results: PredictionResult[] = [];
  @Output() compareSelected = new EventEmitter<PredictionResult[]>();

  selected: PredictionResult[] = [];

  toggleSelection(bid: PredictionResult): void {
    const alreadySelected = this.selected.find(b => b.supplierName === bid.supplierName);
    if (alreadySelected) {
      this.selected = this.selected.filter(b => b.supplierName !== bid.supplierName);
    } else if (this.selected.length < 2) {
      this.selected.push(bid);
    }
    // if (this.selected.length === 2) {
    //   this.compareSelected.emit([...this.selected]);
    // }
  }

  trackByFn(index: number, item: PredictionResult): string {
    return item.supplierName;
  }
}
