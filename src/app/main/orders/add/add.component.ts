import * as _ from 'lodash';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { TranslateService } from '@ngx-translate/core';
import { ProductsService } from '../../../core/services/products.service';
import { CustomersService } from '../../../core/services/customers.service';
import { OrdersService } from '../../../core/services/orders.service';
import { Product } from '../../../core/classes/product';
import { Customer } from '../../../core/classes/customer';
import { Order } from '../../../core/classes/order';
import { OrderDetail } from '../../../core/classes/order-detail';
import { StatsService } from '../../../core/services/stats.service';
import { UtilsService } from '../../../shared/services/utils.service';

@Component({
  selector: 'storaji-orders-add',
  templateUrl: './add.component.html',
  styles: []
})
export class AddComponent implements OnInit, OnDestroy {
  products: Product[] = [new Product()];
  customers: Customer[];
  orders: Order[];

  private _sub: Subscription = undefined;

  constructor(
    private _productsService: ProductsService,
    private _customersService: CustomersService,
    private _ordersService: OrdersService,
    private _statsService: StatsService,
    private _utils: UtilsService,
    public translate: TranslateService
  ) { }

  ngOnInit() {
    this.init();
  }

  ngOnDestroy() {
    this._utils.unsubscribeSub(this._sub);
  }

  async onSubmit() {
    await this._ordersService.add(this.orders);
    this._statsService.get();
    this._statsService.topProducts();
  }

  init() {
    this._utils.unsubscribeSub(this._sub);
    this.orders = [new Order()];
    this.orders[0].order_detail = new OrderDetail();
    this.orders[0].order_detail.product = new Product();

    this._sub = this._productsService.get().subscribe(
      data => {
        const available_stock: Product[] = [];
        _.forEach(data, (product: Product) => {
          if (product.stock > 0) {
            available_stock.push(product);
          }
        });
        this.products = available_stock;
      },
      err => {console.log(err); }
    );

    this._customersService.get();
    this._customersService.customers.subscribe(
      data => this.customers = data,
      err => {console.log(err); }
    );
  }

  add() {
    this.orders.push(new Order());
  }

  available_stock(e: any, i: number) {
    if (e.target.value > this.orders[i].order_detail.product.stock) {
      return e.target.value = this.orders[i].order_detail.product.stock;
    }
  }

}
