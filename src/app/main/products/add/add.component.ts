import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../core/services/products.service';
import { ProductTypesService } from '../../../core/services/product-types.service';
import { Product } from '../../../core/classes/product';
import { ProductType } from '../../../core/classes/product-type';
import { TranslateService } from '@ngx-translate/core';

declare var numeral: any;
@Component({
  selector: 'products-add',
  templateUrl: './add.component.html',
  styles: []
})
export class AddComponent implements OnInit {
  product: Product;
  productTypes: ProductType[];

  constructor(
    private _productsService: ProductsService,
    private _productTypesService: ProductTypesService,
    public translate: TranslateService
  ) { }

  ngOnInit() {
    this.initProduct();
  }

  onSubmit(){
    this.product.cost = numeral(this.product.cost).value()
    this.product.selling_price = numeral(this.product.selling_price).value()
    this._productsService.add(this.product);
  }

  onKeyup(e: any) {
    e.target.value = numeral(e.target.value).format('$0,0')
  }

  initProduct(){
    this._productTypesService.get();
    this._productTypesService.productTypes.subscribe(
      data => (data instanceof Array) ? this.productTypes = data : data,
      err => {console.log(err);}
    );
    this.product = new Product();
  }

}
