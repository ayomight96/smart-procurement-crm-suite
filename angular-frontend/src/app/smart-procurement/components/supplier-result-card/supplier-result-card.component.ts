import { Component, Input, OnChanges } from '@angular/core';
import { PredictionResult } from '../../models/supplier.model';

@Component({
  selector: 'app-supplier-result-card',
  templateUrl: './supplier-result-card.component.html',
})
export class SupplierResultCardComponent implements OnChanges {
  @Input() result!: PredictionResult;

  chartData: any;
  chartOptions: any;
  labelMap: Record<string, string> = {
    averageUnitPrice: 'Average Unit Price (£)',
    averageDeliveryDays: 'Average Delivery Days (Days',
    rating: 'Supplier Rating (stars)',
    defectRate: 'Defect Rate (%)',
  };
  showInfo = false;

  ngOnChanges() {
    if (this.result?.explanation) {
      const rawLabels = Object.keys(this.result.explanation);
      const labels = rawLabels.map((key) => this.labelMap[key] || key);
      const values = rawLabels.map((key) => this.result.explanation[key]);

      const backgroundColors = values.map((v) =>
        v >= 0 ? '#22c55e' : '#ef4444'
      ); // green for positive, red for negative

      this.chartData = {
        labels,
        datasets: [
          {
            label: 'Contribution Score',
            data: values,
            backgroundColor: backgroundColors,
            borderRadius: 5,
            barThickness: 20,
          },
        ],
      };

      this.chartOptions = {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (ctx: any) =>
                `${ctx.label}: ${ctx.parsed.x.toFixed(2)} (${
                  ctx.parsed.x >= 0 ? 'supports' : 'hurts'
                })`,
            },
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Contribution Score',
              color: '#374151',
            },
            ticks: {
              color: '#374151',
            },
          },
          y: {
            ticks: {
              color: '#374151',
            },
          },
        },
      };
    }
  }
}
