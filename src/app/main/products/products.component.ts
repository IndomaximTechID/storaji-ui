import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { TranslateService } from '@ngx-translate/core';
import { isArray } from 'lodash';
import { ProductsService } from '../../core/services/products.service';
import { Product } from '../../core/classes/product';
import { UtilsService } from '../../shared/services/utils.service';

@Component({
  selector: 'storaji-products',
  templateUrl: './products.component.html',
  styles: []
})
export class ProductsComponent implements OnInit, OnDestroy {
  private _sub: Subscription = undefined;
  products: Product[];

  constructor(
    private _productService: ProductsService,
    private _utils: UtilsService,
    public translate: TranslateService
  ) { }

  ngOnInit() {
    this._loadProducts();
  }

  ngOnDestroy() {
    this._utils.unsubscribeSub(this._sub);
  }

  private _loadProducts() {
    this._utils.unsubscribeSub(this._sub);
    this._sub = this._productService.get().subscribe(
      data => isArray(data) ? this.products = data : data
    );
  }

  onUpdate(products: Product[]) {
    this.products = isArray(products) ? products : this.products;
  }

}
