import { NgModule } from '@angular/core';
import { LoginRoutingModule } from './login/login-routing.module';
import { DashboardRoutingModule } from './dashboard/dashboard-routing.module';

@NgModule({
  imports: [
  ],
  declarations: [],
  exports: [
    LoginRoutingModule,
    DashboardRoutingModule
  ]
})
export class MainRoutingModule { }
