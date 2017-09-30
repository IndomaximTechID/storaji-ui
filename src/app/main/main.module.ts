import { NgModule } from '@angular/core';
import { LoginModule } from './login/login.module';
import { MainRoutingModule } from './main-routing.module';
import { RouterModule } from '@angular/router';
import { DashboardModule } from './dashboard/dashboard.module';
import { ProductsModule } from './products/products.module';

@NgModule({
  imports: [],
  declarations: [],
  exports: [
    LoginModule,
    DashboardModule,
    MainRoutingModule,
    ProductsModule
  ]
})
export class MainModule { }
