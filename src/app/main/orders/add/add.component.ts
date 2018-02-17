import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { TranslateService } from '@ngx-translate/core';
import { isArray, forEach } from 'lodash';
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
  private _sub: Subscription = undefined;
  private _addSub: Subscription = undefined;
  private _customerSub: Subscription = undefined;

  @Output('update')
  update: EventEmitter<Order[]> = new EventEmitter<Order[]>();

  products: Product[] = [];
  customers: Customer[] = [];
  orders: Order[] = [];

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
    this._utils.unsubscribeSub(this._customerSub);
    this._utils.unsubscribeSub(this._addSub);
  }

  async onSubmit() {
    this._utils.unsubscribeSub(this._addSub);
    this._addSub = await this._ordersService.add(this.orders).subscribe(
      data => {
        if (isArray(data)) {
          this.update.emit(data);
          this.init();
        }
      }
    );
  }

  init() {
    this._utils.unsubscribeSub(this._sub);
    this._utils.unsubscribeSub(this._customerSub);
    this.orders = [new Order()];

    this._sub = this._productsService.get().subscribe(
      data => {
        forEach(data, (product: Product) => {
          if (product.stock > 0) {
            this.products.push(product);
          }
        });
      },
      err => { console.log(err); }
    );

    this._customerSub = this._customersService.get().subscribe(
      data => this.customers = data,
      err => { console.log(err); }
    );
  }

  onAdd() {
    this.orders.push(new Order());
  }

  available_stock(e: any, i: number) {
    if (e.target.value > this.orders[i].order_detail.product.stock) {
      return e.target.value = this.orders[i].order_detail.product.stock;
    }
  }

}
