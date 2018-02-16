import { Component, OnInit, AfterViewInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs/Subscription';
import { map } from 'lodash';
import { OrdersService } from '../../../core/services/orders.service';
import { OrderFilter } from '../../../core/classes/filter';
import { Order } from '../../../core/classes/order';
import { UtilsService } from '../../../shared/services/utils.service';

declare var numeral: any;
declare var jQuery: any;
@Component({
  selector: 'storaji-orders-filter',
  templateUrl: './filter.component.html',
  styles: []
})
export class FilterComponent implements OnInit, AfterViewInit, OnDestroy {
  private _sub: Subscription = undefined;

  @Output('update')
  update: EventEmitter<Order[]> = new EventEmitter<Order[]>();

  order: OrderFilter;

  constructor(
    private _ordersService: OrdersService,
    private _utils: UtilsService,
    public translate: TranslateService
  ) { }

  ngOnInit() {
    this.order = new OrderFilter();
  }

  ngOnDestroy() {
    this._utils.unsubscribeSub(this._sub);
  }

  ngAfterViewInit() {
    jQuery('input[uk-datepicker]').datepicker();
  }

  onSubmit() {
    this._utils.unsubscribeSub(this._sub);
    map(jQuery('input[uk-datepicker]'), el => {
      const input = jQuery(el)[0];
      this.order.date_range[input.name.slice().replace('date_', '')] = input.value;
      return el;
    });

    this._sub = this._ordersService.get(this.order).subscribe(
      data => this.update.emit(data)
    );
  }

}
