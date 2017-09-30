import { NgModule } from '@angular/core';
import { LoginRoutingModule } from './login/login-routing.module';
import { DashboardRoutingModule } from './dashboard/dashboard-routing.module';
import { ProductsRoutingModule } from './products/products-routing.module';

@NgModule({
  imports: [],
  declarations: [],
  exports: [
    LoginRoutingModule,
    DashboardRoutingModule,
    ProductsRoutingModule
  ]
})
export class MainRoutingModule { }
