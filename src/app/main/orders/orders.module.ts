import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/modules/shared.module';
import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersService } from '../../core/services/orders.service';

@NgModule({
  imports: [
    SharedModule,
    OrdersRoutingModule
  ],
  providers: [OrdersService],
  declarations: []
})
export class OrdersModule { }
