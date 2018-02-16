import { Component, OnInit, AfterViewInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as _ from 'lodash';
import { OrdersService } from '../../../core/services/orders.service';
import { OrderFilter } from '../../../core/classes/filter';

declare var numeral: any;
declare var jQuery: any;
@Component({
  selector: 'storaji-orders-filter',
  templateUrl: './filter.component.html',
  styles: []
})
export class FilterComponent implements OnInit, AfterViewInit {
  order: OrderFilter;

  constructor(
    private _ordersService: OrdersService,
    public translate: TranslateService
  ) { }

  ngOnInit() {
    this.order = new OrderFilter();
  }

  ngAfterViewInit() {
    jQuery('input[uk-datepicker]').datepicker();
  }

  onSubmit() {
    _.map(jQuery('input[uk-datepicker]'), el => {
      const input = jQuery(el)[0];
      this.order.date_range[input.name.slice().replace('date_', '')] = input.value;
      return el;
    });
    this._ordersService.get(this.order);
  }

}
