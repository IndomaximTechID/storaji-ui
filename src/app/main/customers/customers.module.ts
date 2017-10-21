import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/modules/shared.module';
import { CustomersRoutingModule } from './customers-routing.module';
import { CustomersService } from '../../core/services/customers.service';

@NgModule({
  imports: [
    SharedModule,
    CustomersRoutingModule
  ],
  providers: [CustomersService],
  declarations: []
})
export class CustomersModule { }
