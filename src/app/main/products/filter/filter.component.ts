import { Component, OnInit, AfterViewInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { map, isArray } from 'lodash';
import { Subscription } from 'rxjs/Subscription';
import { ProductsService } from '../../../core/services/products.service';
import { ProductTypesService } from '../../../core/services/product-types.service';
import { Product } from '../../../core/classes/product';
import { ProductFilter } from '../../../core/classes/filter';
import { ProductType } from '../../../core/classes/product-type';
import { UtilsService } from '../../../shared/services/utils.service';

declare var numeral: any;
declare var jQuery: any;
@Component({
  selector: 'storaji-products-filter',
  templateUrl: './filter.component.html',
  styles: []
})
export class FilterComponent implements OnInit, AfterViewInit, OnDestroy {
  private _sub: Subscription = undefined;
  private _typeSub: Subscription = undefined;

  @Output('update')
  update: EventEmitter<Product[]> = new EventEmitter<Product[]>();

  product: ProductFilter = new ProductFilter();
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
    this._utils.unsubscribeSub(this._typeSub);
  }

  ngAfterViewInit() {
    jQuery('input[uk-datepicker]').datepicker();
  }

  onSubmit() {
    this._utils.unsubscribeSub(this._sub);
    map(jQuery('input[uk-datepicker]'), el => {
      const input = jQuery(el)[0];
      this.product.date_range[input.name.slice().replace('date_', '')] = input.value;
      return el;
    });
    this._sub = this._productsService.get(this.product)
      .subscribe(data => {
        if (isArray(data)) {
          this.update.emit(data);
        }
      });
  }

  initProduct() {
    this._utils.unsubscribeSub(this._typeSub);
    this.product = new ProductFilter();
    this._productTypesService.get().subscribe(
      data => isArray(data) ? this.productTypes = data : data,
      err => { console.log(err); }
    );
  }

}
