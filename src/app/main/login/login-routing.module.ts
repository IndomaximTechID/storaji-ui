import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';
import { SharedModule } from '../../shared/modules/shared.module';
import { GuestGuard } from '../../core/services/guest.guard';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: 'login', component: LoginComponent, canActivate: [GuestGuard] }
    ])
  ],
  declarations: [LoginComponent],
  providers: [GuestGuard],
  exports: [
    RouterModule,
    LoginComponent
  ]
})
export class LoginRoutingModule { }
