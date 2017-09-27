import { NgModule } from '@angular/core';
import { LoginModule } from './login/login.module';
import { MainRoutingModule } from './main-routing.module';
import { RouterModule } from '@angular/router';
import { DashboardModule } from './dashboard/dashboard.module';

@NgModule({
  imports: [
  ],
  declarations: [],
  exports: [
    LoginModule,
    DashboardModule,
    MainRoutingModule
  ]
})
export class MainModule { }
