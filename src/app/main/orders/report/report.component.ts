import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../../core/services/orders.service';
import { Order } from '../../../core/classes/order';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'orders-report',
  templateUrl: './report.component.html',
  styles: []
})
export class ReportComponent implements OnInit {
  orders: Order[];

  constructor(
    private _ordersService: OrdersService,
    public translate: TranslateService
  ) { }

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders(){
    this._ordersService.get();
    this._ordersService.orders.subscribe(
      data => (data instanceof Array) ? this.orders = data : data
    );
    
  }

}
