import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ProductsService } from '../../../core/services/products.service';
import { Product } from '../../../core/classes/product';
import 'rxjs/add/operator/switchMap';
import { TranslateService } from '@ngx-translate/core';

declare var numeral: any;
@Component({
  selector: 'products-overview',
  templateUrl: './overview.component.html',
  styles: []
})
export class OverviewComponent implements OnInit {
  product: Product = new Product();
  currency = numeral();

  constructor(
    private routes: ActivatedRoute,
    private _productService: ProductsService,
    public translate: TranslateService
  ) { }

  ngOnInit() {
    this.loadProduct();
  }

  loadProduct(){
    this.routes.paramMap
        .switchMap((params: ParamMap) => {
          this._productService.find(params.get('id'))
          return this._productService.products;
        })
        .subscribe(
          data => {
            (data instanceof Object) ? this.product = data : data
          }
        );
  }

}
