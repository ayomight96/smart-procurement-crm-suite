import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { PredictionResult } from '../../models/supplier.model';

@Component({
  selector: 'app-comparison-view',
  templateUrl: './comparison-view.component.html',
})
export class ComparisonViewComponent implements OnChanges {
  @Input() left!: PredictionResult;
  @Input() right!: PredictionResult;
  @Output() close = new EventEmitter<void>();
  @Input() visible!: boolean;

  chartData: any;
  chartOptions: any;

  ngOnChanges(): void {
    if (this.left && this.right) {
      const labels = Object.keys(this.left.explanation);

      this.chartData = {
        labels,
        datasets: [
          {
            label: this.left.supplierName,
            data: labels.map((l) => this.left.explanation[l]),
            backgroundColor: '#3b82f6',
          },
          {
            label: this.right.supplierName,
            data: labels.map((l) => this.right.explanation[l]),
            backgroundColor: '#10b981',
          },
        ],
      };

      this.chartOptions = {
        responsive: true,
        indexAxis: 'y',
        scales: {
          x: { stacked: true },
          y: { stacked: true },
        },
        plugins: {
          legend: { position: 'bottom' },
        },
      };
    }
  }

  confidenceClass(confidence: string): string {
    return (
      {
        'Very High': 'text-green-700',
        High: 'text-blue-700',
        Medium: 'text-yellow-700',
        Low: 'text-red-700',
      }[confidence] || 'text-gray-700'
    );
  }
}
