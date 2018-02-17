import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs/Subscription';
import { TranslateService } from '@ngx-translate/core';
import { isObject } from 'lodash';
import { ProductsService } from '../../../core/services/products.service';
import { ProductTypesService } from '../../../core/services/product-types.service';
import { Product } from '../../../core/classes/product';
import { ProductType } from '../../../core/classes/product-type';
import { UtilsService } from '../../../shared/services/utils.service';

declare var numeral: any;
@Component({
  selector: 'storaji-products-edit',
  templateUrl: './edit.component.html',
  styles: []
})
export class EditComponent implements OnInit, OnDestroy {
  private _updateSub: Subscription = undefined;
  private _deleteSub: Subscription = undefined;
  private _typeSub: Subscription = undefined;

  @Input('product')
  product: Product = new Product();

  @Output('update')
  update: EventEmitter<Product> = new EventEmitter<Product>();

  productTypes: ProductType[];

  constructor(
    private _productsService: ProductsService,
    private _productTypesService: ProductTypesService,
    private _utils: UtilsService,
    private _location: Location,
    public translate: TranslateService
  ) { }

  ngOnInit() {
    this.initProduct();
  }

  ngOnDestroy() {
    this._utils.unsubscribeSub(this._updateSub);
    this._utils.unsubscribeSub(this._deleteSub);
    this._utils.unsubscribeSub(this._typeSub);
  }

  onSubmit() {
    this._utils.unsubscribeSub(this._updateSub);
    this.product.cost = numeral(this.product.cost).value();
    this.product.selling_price = numeral(this.product.selling_price).value();
    this._updateSub = this._productsService.update(this.product.id, this.product)
      .subscribe(data => {
        if (isObject(data)) {
          this.product = data;

          this.product.cost = numeral(this.product.cost).format(this._utils.format);
          this.product.selling_price = numeral(this.product.selling_price).format(this._utils.format);
          this.update.emit(this.product);
        }
      });
  }

  onKeyup(e: any) {
    e.target.value = numeral(e.target.value).format(this._utils.format);
  }

  onDelete() {
    this._utils.unsubscribeSub(this._deleteSub);
    this._deleteSub = this._productsService.delete(this.product.id)
      .subscribe(data => this._location.back());
  }

  initProduct() {
    this._utils.unsubscribeSub(this._typeSub);
    this._typeSub = this._productTypesService.get().subscribe(
      data => this.productTypes = data,
      err => { console.log(err); }
    );
  }

}
