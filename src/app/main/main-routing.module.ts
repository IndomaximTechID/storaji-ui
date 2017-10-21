import { NgModule } from '@angular/core';
import { LoginRoutingModule } from './login/login-routing.module';
import { DashboardRoutingModule } from './dashboard/dashboard-routing.module';
import { ProductsRoutingModule } from './products/products-routing.module';
import { CustomersRoutingModule } from './customers/customers-routing.module';
import { OrdersRoutingModule } from './orders/orders-routing.module';
import { RegisterRoutingModule } from './register/register-routing.module';

@NgModule({
  imports: [],
  declarations: [],
  exports: [
    LoginRoutingModule,
    ProductsRoutingModule,
    CustomersRoutingModule,
    OrdersRoutingModule,
    DashboardRoutingModule,
    RegisterRoutingModule
  ]
})
export class MainRoutingModule { }
