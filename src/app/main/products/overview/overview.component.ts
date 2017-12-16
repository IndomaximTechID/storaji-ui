import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ProductsService } from '../../../core/services/products.service';
import { Product } from '../../../core/classes/product';
import 'rxjs/add/operator/switchMap';
import { TranslateService } from '@ngx-translate/core';
import { Customer } from '../../../core/classes/customer';

declare var numeral: any;
@Component({
  selector: 'storaji-products-overview',
  templateUrl: './overview.component.html',
  styles: []
})
export class OverviewComponent implements OnInit {
  product: Product = new Product();
  customers: Customer[];
  currency = numeral();

  constructor(
    private routes: ActivatedRoute,
    private _productService: ProductsService,
    public translate: TranslateService
  ) { }

  ngOnInit() {
    this.loadProduct();
  }

  async loadProduct() {
    await this.routes.paramMap
        .switchMap((params: ParamMap) => {
          this._productService.find(params.get('id'));
          return this._productService.products;
        })
        .subscribe(
          data => {
            if (data instanceof Object) {
              this.product = data;
            }
          }
        );
  }

  async loadCustomers() {
    await this.routes.paramMap
        .switchMap((params: ParamMap) => {
          this._productService.getCustomers(params.get('id'));
          return this._productService.customers;
        })
        .subscribe(
          data => {
            if (data instanceof Array) {
              this.customers = data;
            }
          }
        );
  }

}
