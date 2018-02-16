import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import * as Highcharts from 'highcharts';
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';
import { ChartModule } from 'angular2-highcharts';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../../shared/modules/shared.module';
import { AuthGuard } from '../../core/services/auth.guard';
import { OrdersRoutingModule } from '../orders/orders-routing.module';

export function HighchartsFactory() {
  Highcharts.setOptions({
    colors: ['#39f', '#ccc']
  });
  return Highcharts;
}

@NgModule({
  imports: [
    SharedModule,
    OrdersRoutingModule,
    ChartModule,
    RouterModule.forChild([
      { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] }
    ])
  ],
  declarations: [DashboardComponent],
  providers: [
    AuthGuard,
    {
      provide: HighchartsStatic,
      useFactory: HighchartsFactory
    }
  ],
  exports: [
    RouterModule,
    DashboardComponent
  ]

})
export class DashboardRoutingModule { }
