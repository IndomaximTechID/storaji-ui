import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductsComponent } from './products.component';
import { SharedModule } from '../../shared/modules/shared.module';
import { AuthGuard } from '../../core/services/auth.guard';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { OverviewComponent } from './overview/overview.component';
import { ReportComponent } from './report/report.component';
import { FilterComponent } from './filter/filter.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: 'dashboard/products', canActivateChild: [AuthGuard],
        children: [
          { path: '', component: ProductsComponent },
          { path: 'report', component: ReportComponent },
          { path: ':id', component: OverviewComponent }
        ]
      },
    ])
  ],
  declarations: [
    ProductsComponent,
    AddComponent,
    EditComponent,
    OverviewComponent,
    ReportComponent,
    FilterComponent
  ],
  providers: [AuthGuard],
  exports: [
    RouterModule,
    ProductsComponent,
    AddComponent,
    EditComponent,
    OverviewComponent,
    ReportComponent,
    FilterComponent
  ]

})
export class ProductsRoutingModule { }
