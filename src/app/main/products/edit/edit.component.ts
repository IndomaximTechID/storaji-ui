import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { ProductsService } from '../../../core/services/products.service';
import { ProductTypesService } from '../../../core/services/product-types.service';
import { Product } from '../../../core/classes/product';
import { ProductType } from '../../../core/classes/product-type';
import { TranslateService } from '@ngx-translate/core';

declare var numeral: any;
@Component({
  selector: 'storaji-products-edit',
  templateUrl: './edit.component.html',
  styles: []
})
export class EditComponent implements OnInit {
  product: Product = new Product();
  productTypes: ProductType[];

  constructor(
    private routes: ActivatedRoute,
    private _productsService: ProductsService,
    private _productTypesService: ProductTypesService,
    private location: Location,
    public translate: TranslateService
  ) { }

  ngOnInit() {
    this.initProduct();
  }

  onSubmit() {
    this.product.cost = numeral(this.product.cost).value();
    this.product.selling_price = numeral(this.product.selling_price).value();
    this.routes.paramMap
        .switchMap((params: ParamMap) => {
          this._productsService.update(params.get('id'), this.product);
          return this._productsService.products;
        })
        .subscribe(
          data => (data instanceof Object) ? this.product = data : data
        );
  }

  onKeyup(e: any) {
    e.target.value = numeral(e.target.value).format(localStorage.getItem('format'));
  }

  onDelete() {
    this.routes.paramMap
        .switchMap((params: ParamMap) => {
          this._productsService.delete(params.get('id'));
          return this._productsService.products;
        })
        .subscribe(
          data => (data instanceof Object) ? this.product = data : data
        );
    this.location.back();
    this.initProduct();
  }

  initProduct() {
    this._productTypesService.get();
    this._productTypesService.productTypes.subscribe(
      data => this.productTypes = data,
      err => {console.log(err); }
    );

    this.routes.paramMap
        .switchMap((params: ParamMap) => {
          this._productsService.find(params.get('id'));
          return this._productsService.products;
        })
        .subscribe(
          data => {
            if (data instanceof Object) {
              this.product = data;
            }
            this.product.cost = numeral(this.product.cost).format(localStorage.getItem('format'));
            this.product.selling_price = numeral(this.product.selling_price).format(localStorage.getItem('format'));
          }
        );
  }

}
