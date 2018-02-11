import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import * as Highcharts from 'highcharts';
import { ChartModule  } from 'angular2-highcharts';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../../shared/modules/shared.module';
import { AuthGuard } from '../../core/services/auth.guard';
import { OrdersRoutingModule } from '../orders/orders-routing.module';

Highcharts.setOptions({
  colors: ['#39f', '#ccc']
});

@NgModule({
  imports: [
    SharedModule,
    OrdersRoutingModule,
    ChartModule.forRoot(Highcharts),
    RouterModule.forChild([
      { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] }
    ])
  ],
  declarations: [DashboardComponent],
  providers: [AuthGuard],
  exports: [
    RouterModule,
    DashboardComponent
  ]

})
export class DashboardRoutingModule { }
