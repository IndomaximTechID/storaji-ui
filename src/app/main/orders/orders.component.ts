import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../core/services/orders.service';
import { Order } from '../../core/classes/order';

@Component({
  selector: 'storaji-orders',
  templateUrl: './orders.component.html',
  styles: []
})
export class OrdersComponent implements OnInit {
  orders: Order[];

  constructor(private _ordersService: OrdersService) { }

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
