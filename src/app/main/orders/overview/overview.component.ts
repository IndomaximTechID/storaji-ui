import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { OrdersService } from '../../../core/services/orders.service';
import { Order } from '../../../core/classes/order';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'orders-overview',
  templateUrl: './overview.component.html',
  styles: []
})
export class OverviewComponent implements OnInit {
  private order: Order;

  constructor(private routes: ActivatedRoute, private _ordersService: OrdersService) { }

  ngOnInit() {
    this.loadOrder();
  }

  loadOrder(){
    this.routes.paramMap
        .switchMap((params: ParamMap) => {
          this._ordersService.find(params.get('id'))
          return this._ordersService.orders;
        })
        .subscribe(
          data => (data instanceof Object) ? this.order = data : data
        );
  }

}
