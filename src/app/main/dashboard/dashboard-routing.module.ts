import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../../shared/modules/shared.module';
import { AuthGuard } from '../../core/services/auth.guard';
import { OrdersRoutingModule } from '../orders/orders-routing.module';

@NgModule({
  imports: [
    SharedModule,
    OrdersRoutingModule,
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
