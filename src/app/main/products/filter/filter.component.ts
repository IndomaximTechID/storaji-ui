import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ProductsService } from '../../../core/services/products.service';
import { ProductTypesService } from '../../../core/services/product-types.service';
import { Product } from '../../../core/classes/filter';
import { ProductType } from '../../../core/classes/product-type';
import { TranslateService } from '@ngx-translate/core';

declare var numeral: any;
declare var jQuery: any;
@Component({
  selector: 'storaji-products-filter',
  templateUrl: './filter.component.html',
  styles: []
})
export class FilterComponent implements OnInit, AfterViewInit {
  product: Product;
  productTypes: ProductType[];

  constructor(
    private _productsService: ProductsService,
    private _productTypesService: ProductTypesService,
    public translate: TranslateService
  ) { }

  ngOnInit() {
    this.product = new Product();
    this.initProduct();
  }

  ngAfterViewInit() {
    jQuery('input[uk-datepicker]').datepicker();
  }

  onSubmit() {
    this._productsService.get(this.product);
  }

  initProduct() {
    this._productTypesService.get();
    this._productTypesService.productTypes.subscribe(
      data => (data instanceof Array) ? this.productTypes = data : data,
      err => {console.log(err); }
    );
  }

}
