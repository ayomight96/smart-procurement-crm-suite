import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SmartProcurementComponent } from './smart-procurement.component';
import { MainViewComponent } from './pages/main-view/main-view.component';
import { DocumentationPageComponent } from './pages/documentation-page/documentation-page.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'docs', component: DocumentationPageComponent }, 
  { path: 'demo', component: MainViewComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SmartProcurementRoutingModule {}
