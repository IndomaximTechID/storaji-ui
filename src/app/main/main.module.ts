import { NgModule } from '@angular/core';
import { LoginModule } from './login/login.module';
import { MainRoutingModule } from './main-routing.module';
import { RouterModule } from '@angular/router';
import { DashboardModule } from './dashboard/dashboard.module';
import { ProductsModule } from './products/products.module';
import { CustomersModule } from './customers/customers.module';
import { OrdersModule } from './orders/orders.module';
import { RegisterModule } from './register/register.module';

@NgModule({
  imports: [],
  declarations: [],
  exports: [
    MainRoutingModule,
    LoginModule,
    ProductsModule,
    CustomersModule,
    OrdersModule,
    DashboardModule,
    RegisterModule
  ]
})
export class MainModule { }
