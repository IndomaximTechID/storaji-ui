import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../core/services/products.service';
import { ProductTypesService } from '../../../core/services/product-types.service';
import { Product } from '../../../core/classes/product';
import { ProductType } from '../../../core/classes/product-type';
import { AutoCompleteService } from '../../../shared/services/autocomplete.service';

@Component({
  selector: 'products-add',
  templateUrl: './add.component.html',
  styles: []
})
export class AddComponent implements OnInit {
  private product: any;
  private productTypes: ProductType[];

  constructor(private _productsService: ProductsService, private _productTypesService: ProductTypesService, private autocomplete: AutoCompleteService) { }

  ngOnInit() {
    this.initProduct();
  }

  onSubmit(){
    this.product.type_id = this.product.type.id;
    this._productsService.add(this.product);
    this.initProduct();
  }

  initProduct(){
    this._productTypesService.get();
    this._productTypesService.productTypes.subscribe(
      data => this.productTypes = data,
      err => {console.log(err);}
    );
    this.product = new Product();
  }

}
