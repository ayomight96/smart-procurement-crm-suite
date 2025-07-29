import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SmartProcurementRoutingModule } from './smart-procurement-routing.module';
import { SmartProcurementComponent } from './smart-procurement.component';
import { MainViewComponent } from './pages/main-view/main-view.component';
import { SupplierFormComponent } from './components/supplier-form/supplier-form.component';
import { SupplierResultCardComponent } from './components/supplier-result-card/supplier-result-card.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ChartModule } from 'primeng/chart';
import { TooltipModule } from 'primeng/tooltip';
import { DialogModule } from 'primeng/dialog';
import { BidListComponent } from './components/bid-list/bid-list.component';
import { ComparisonViewComponent } from './components/comparison-view/comparison-view.component';
import { TabViewModule } from 'primeng/tabview';
import { SingleBidPanelComponent } from './pages/single-bid-panel/single-bid-panel.component';
import { BatchBidPanelComponent } from './pages/batch-bid-panel/batch-bid-panel.component';
import { DocumentationPageComponent } from './pages/documentation-page/documentation-page.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';


@NgModule({
  declarations: [
    SmartProcurementComponent,
    MainViewComponent,
    SupplierFormComponent,
    SupplierResultCardComponent,
    BidListComponent,
    ComparisonViewComponent,
    SingleBidPanelComponent,
    BatchBidPanelComponent,
    DocumentationPageComponent,
    LandingPageComponent
  ],
  imports: [
    CommonModule,
    SmartProcurementRoutingModule,
    ReactiveFormsModule,
    ChartModule,
    TooltipModule,
    DialogModule,
    TabViewModule
  ]
})
export class SmartProcurementModule { }
