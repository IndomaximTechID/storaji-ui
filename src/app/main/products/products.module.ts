import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/modules/shared.module';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductsService } from '../../core/services/products.service';
import { ProductTypesService } from '../../core/services/product-types.service';

@NgModule({
  imports: [
    SharedModule,
    ProductsRoutingModule
  ],
  providers: [ProductsService, ProductTypesService],
  declarations: []
})
export class ProductsModule { }
