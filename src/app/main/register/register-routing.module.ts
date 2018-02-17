import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RegisterComponent } from './register.component';
import { SharedModule } from '../../shared/modules/shared.module';
import { GuestGuard } from '../../core/services/guest.guard';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: 'register', component: RegisterComponent, canActivate: [GuestGuard] }
    ])
  ],
  declarations: [RegisterComponent],
  providers: [GuestGuard],
  exports: [
    RouterModule,
    RegisterComponent
  ]
})
export class RegisterRoutingModule { }
