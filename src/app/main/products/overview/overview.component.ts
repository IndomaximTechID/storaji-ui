import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import 'rxjs/add/operator/switchMap';
import { TranslateService } from '@ngx-translate/core';
import * as tus from 'tus-js-client';
import { ProductsService } from '../../../core/services/products.service';
import { Product } from '../../../core/classes/product';
import { Customer } from '../../../core/classes/customer';

declare var numeral: any;

interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

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
    public _domSanitizer: DomSanitizer,
    public translate: TranslateService
  ) { }

  ngOnInit() {
    this.loadProduct();
  }

  onUpload(e: HTMLInputEvent) {
    const file = e.target.files[0];

    const upload: any = new tus.Upload(file, {
        endpoint: 'https://master.tus.io/files/',
        retryDelays: [0, 1000, 3000, 5000],
        onError: (error) => {
            console.log(`Failed because: ${error}`);
        },
        onSuccess: () => {
          this.product.image = upload.url;
          this.routes.paramMap
              .switchMap((params: ParamMap) => {
                this._productService.update(params.get('id'), this.product);
                return this._productService.products;
              })
              .subscribe(
                data => (data instanceof Object) ? this.product = data : data
              );
        }
    });

    upload.start();
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
