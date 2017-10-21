import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/modules/shared.module';
import { HttpModule } from '@angular/http';
import { RegisterRoutingModule } from './register-routing.module';
import { AuthService } from '../../core/services/auth.service';
import { CompanyTypesService } from '../../core/services/company-types.service';

@NgModule({
  imports: [
    SharedModule,
    HttpModule,
    RegisterRoutingModule
  ],
  providers: [AuthService, CompanyTypesService]
})
export class RegisterModule { }
