import { Component, OnInit, AfterViewInit } from '@angular/core';
import { OrdersService } from '../../../core/services/orders.service';
import { Order } from '../../../core/classes/filter';
import { TranslateService } from '@ngx-translate/core';

declare var numeral: any;
declare var jQuery: any;
@Component({
  selector: 'orders-filter',
  templateUrl: './filter.component.html',
  styles: []
})
export class FilterComponent implements OnInit, AfterViewInit {
  order: Order;

  constructor(
    private _ordersService: OrdersService,
    public translate: TranslateService
  ) { }

  ngOnInit() {
    this.order = new Order();
  }

  ngAfterViewInit() {
    jQuery('input[uk-datepicker]').datepicker();
  }

  onSubmit(){
    this._ordersService.get(this.order);
  }

}
