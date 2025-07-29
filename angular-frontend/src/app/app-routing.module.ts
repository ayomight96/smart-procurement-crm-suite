import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'smart-procurement',
    pathMatch: 'full',
  },
  {
    path: 'smart-procurement',
    loadChildren: () =>
      import('./smart-procurement/smart-procurement.module').then(
        (m) => m.SmartProcurementModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
