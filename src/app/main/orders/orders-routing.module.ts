import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OrdersComponent } from './orders.component';
import { SharedModule } from '../../shared/modules/shared.module';
import { AuthGuard } from '../../core/services/auth.guard';
import { AddComponent } from './add/add.component';
import { OverviewComponent } from './overview/overview.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: 'dashboard/orders', canActivateChild: [AuthGuard],
        children: [
          { path: '', component: OrdersComponent },
          { path: ':id', component: OverviewComponent }
        ]
      },
    ])
  ],
  declarations: [
    OrdersComponent,
    AddComponent,
    OverviewComponent
  ],
  providers: [AuthGuard],
  exports: [
    RouterModule,
    OrdersComponent,
    AddComponent,
    OverviewComponent
  ]

})
export class OrdersRoutingModule { }
