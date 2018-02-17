import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OrdersComponent } from './orders.component';
import { SharedModule } from '../../shared/modules/shared.module';
import { AuthGuard } from '../../core/services/auth.guard';
import { AddComponent } from './add/add.component';
import { OverviewComponent } from './overview/overview.component';
import { ReportComponent } from './report/report.component';
import { FilterComponent } from './filter/filter.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: 'dashboard/orders', canActivateChild: [AuthGuard],
        children: [
          { path: '', component: OrdersComponent },
          { path: 'report', component: ReportComponent },
          { path: ':id', component: OverviewComponent }
        ]
      },
    ])
  ],
  declarations: [
    OrdersComponent,
    AddComponent,
    OverviewComponent,
    ReportComponent,
    FilterComponent
  ],
  providers: [AuthGuard],
  exports: [
    RouterModule,
    OrdersComponent,
    AddComponent,
    OverviewComponent,
    ReportComponent,
    FilterComponent
  ]

})
export class OrdersRoutingModule { }
