import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs/Subscription';
import { isArray } from 'lodash';
import { ProductsService } from '../../../core/services/products.service';
import { ProductTypesService } from '../../../core/services/product-types.service';
import { Product } from '../../../core/classes/product';
import { ProductType } from '../../../core/classes/product-type';
import { UtilsService } from '../../../shared/services/utils.service';

declare var numeral: any;
@Component({
  selector: 'storaji-products-add',
  templateUrl: './add.component.html',
  styles: []
})
export class AddComponent implements OnInit, OnDestroy {
  private _sub: Subscription = undefined;
  private _typeSub: Subscription = undefined;

  @Output('update')
  update: EventEmitter<Product[]> = new EventEmitter<Product[]>();

  product: Product;
  productTypes: ProductType[];

  constructor(
    private _productsService: ProductsService,
    private _productTypesService: ProductTypesService,
    private _utils: UtilsService,
    public translate: TranslateService
  ) { }

  ngOnInit() {
    this.initProduct();
  }

  ngOnDestroy() {
    this._utils.unsubscribeSub(this._sub);
  }

  onSubmit() {
    this._utils.unsubscribeSub(this._sub);
    this.product.cost = numeral(this.product.cost).value();
    this.product.selling_price = numeral(this.product.selling_price).value();
    this._sub = this._productsService.add(this.product)
      .subscribe(data => {
        if (isArray(data)) {
          this.update.emit(data);
          this.initProduct();
        }
      });
  }

  onKeyup(e: any) {
    e.target.value = numeral(e.target.value).format(this._utils.format);
  }

  initProduct() {
    this._utils.unsubscribeSub(this._typeSub);
    this._typeSub = this._productTypesService.get().subscribe(
      data => isArray(data) ? this.productTypes = data : data,
      err => { console.log(err); }
    );
    this.product = new Product();
  }

}
