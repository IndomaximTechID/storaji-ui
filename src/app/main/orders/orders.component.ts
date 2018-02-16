import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { isArray } from 'lodash';
import { OrdersService } from '../../core/services/orders.service';
import { Order } from '../../core/classes/order';
import { Subscription } from 'rxjs/Subscription';
import { UtilsService } from '../../shared/services/utils.service';

@Component({
  selector: 'storaji-orders',
  templateUrl: './orders.component.html',
  styles: []
})
export class OrdersComponent implements OnInit, OnDestroy {
  private _sub: Subscription = undefined;
  orders: Order[];

  constructor(
    private _ordersService: OrdersService,
    private _utils: UtilsService,
    public translate: TranslateService
  ) { }

  ngOnInit() {
    this.loadOrders();
  }

  ngOnDestroy() {
    this._utils.unsubscribeSub(this._sub);
  }

  loadOrders() {
    this._utils.unsubscribeSub(this._sub);
    this._sub = this._ordersService.get().subscribe(
      data => isArray(data) ? this.orders = data : data
    );
  }

  onUpdate(orders: Order[]) {
    this.orders = isArray(orders) ? orders : this.orders;
  }

}
