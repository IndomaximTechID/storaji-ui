import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { DomSanitizer } from '@angular/platform-browser';
import 'rxjs/add/operator/switchMap';
import { TranslateService } from '@ngx-translate/core';
import * as tus from 'tus-js-client';
import { isArray, isObject } from 'lodash';
import { ProductsService } from '../../../core/services/products.service';
import { Product } from '../../../core/classes/product';
import { Customer } from '../../../core/classes/customer';
import { UtilsService } from '../../../shared/services/utils.service';

declare var numeral: any;

interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'storaji-products-overview',
  templateUrl: './overview.component.html',
  styles: []
})
export class OverviewComponent implements OnInit, OnDestroy {
  private _sub: Subscription = undefined;
  private _updateSub: Subscription = undefined;
  private _customerSub: Subscription = undefined;

  product: Product = new Product();
  customers: Customer[];
  currency = numeral();

  constructor(
    private _routes: ActivatedRoute,
    private _utils: UtilsService,
    private _productService: ProductsService,
    public _domSanitizer: DomSanitizer,
    public translate: TranslateService
  ) { }

  ngOnInit() {
    this.loadProduct();
  }

  ngOnDestroy() {
    this._utils.unsubscribeSub(this._sub);
    this._utils.unsubscribeSub(this._customerSub);
    this._utils.unsubscribeSub(this._updateSub);
  }

  onUpload(e: HTMLInputEvent) {
    this._utils.unsubscribeSub(this._updateSub);
    const file = e.target.files[0];

    const upload: any = new tus.Upload(file, {
      endpoint: 'https://master.tus.io/files/',
      retryDelays: [0, 1000, 3000, 5000],
      onError: (error) => {
        console.log(`Failed because: ${error}`);
      },
      onSuccess: () => {
        this.product.image = upload.url;
        this._updateSub = this._routes.paramMap
          .switchMap((params: ParamMap) => {
            return this._productService.update(params.get('id'), this.product);
          })
          .subscribe(
          data => {
            if (isObject(data)) {
              this.product = data;

              this.product.cost = numeral(this.product.cost).format(this._utils.format);
              this.product.selling_price = numeral(this.product.selling_price).format(this._utils.format);
            }
          }
          );
      }
    });

    upload.start();
  }

  onUpdate(product: Product) {
    this.product = product;
  }

  async loadProduct() {
    this._utils.unsubscribeSub(this._sub);
    this._sub = await this._routes.paramMap
      .switchMap((params: ParamMap) => {
        return this._productService.find(params.get('id'));
      })
      .subscribe(data => {
        if (isObject(data)) {
          this.product = data;

          this.product.cost = numeral(this.product.cost).format(this._utils.format);
          this.product.selling_price = numeral(this.product.selling_price).format(this._utils.format);
        }
      });
  }

  async loadCustomers() {
    this._utils.unsubscribeSub(this._customerSub);
    this._customerSub = await this._routes.paramMap
      .switchMap((params: ParamMap) => {
        return this._productService.getCustomers(params.get('id'));
      })
      .subscribe(data => {
        if (isArray(data)) {
          this.customers = data;
        }
      });
  }

}
