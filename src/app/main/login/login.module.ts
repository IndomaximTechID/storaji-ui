import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/modules/shared.module';
import { HttpModule } from '@angular/http';
import { LoginRoutingModule } from './login-routing.module';
import { AuthService } from '../../core/services/auth.service';

@NgModule({
  imports: [
    SharedModule,
    HttpModule,
    LoginRoutingModule
  ],
  providers: [AuthService]
})
export class LoginModule { }
