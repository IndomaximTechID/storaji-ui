import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../../shared/modules/shared.module';
import { AuthGuard } from '../../core/services/auth.guard';

@NgModule({
  imports: [
    SharedModule,
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
