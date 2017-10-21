import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { OrdersService } from '../../../core/services/orders.service';
import { Order } from '../../../core/classes/order';
import 'rxjs/add/operator/switchMap';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'orders-overview',
  templateUrl: './overview.component.html',
  styles: []
})
export class OverviewComponent implements OnInit {
  order: Order;

  constructor(
    private routes: ActivatedRoute,
    private _ordersService: OrdersService,
    public translate: TranslateService
  ) { }

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
