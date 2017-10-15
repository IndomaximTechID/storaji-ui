import { NgModule } from '@angular/core';
import { LoginRoutingModule } from './login/login-routing.module';
import { DashboardRoutingModule } from './dashboard/dashboard-routing.module';
import { ProductsRoutingModule } from './products/products-routing.module';
import { CustomersRoutingModule } from './customers/customers-routing.module';
import { OrdersRoutingModule } from './orders/orders-routing.module';

@NgModule({
  imports: [],
  declarations: [],
  exports: [
    LoginRoutingModule,
    ProductsRoutingModule,
    CustomersRoutingModule,
    OrdersRoutingModule,
    DashboardRoutingModule
  ]
})
export class MainRoutingModule { }
