import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/modules/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { OrdersService } from '../../core/services/orders.service';
import { StatsService } from '../../core/services/stats.service';

@NgModule({
  imports: [
    SharedModule,
    DashboardRoutingModule
  ],
  providers: [OrdersService, StatsService]
})
export class DashboardModule { }
