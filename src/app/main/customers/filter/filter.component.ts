import { Component, OnInit, AfterViewInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { map, isArray } from 'lodash';
import { Subscription } from 'rxjs/Subscription';
import { CustomersService } from '../../../core/services/customers.service';
import { CustomerFilter } from '../../../core/classes/filter';
import { Customer } from '../../../core/classes/customer';
import { UtilsService } from '../../../shared/services/utils.service';

declare var numeral: any;
declare var jQuery: any;
@Component({
  selector: 'storaji-customers-filter',
  templateUrl: './filter.component.html',
  styles: []
})
export class FilterComponent implements OnInit, AfterViewInit, OnDestroy {
  private _sub: Subscription = undefined;

  @Output('update')
  update: EventEmitter<Customer[]> = new EventEmitter<Customer[]>();

  customer: CustomerFilter;

  constructor(
    private _customersService: CustomersService,
    private _utils: UtilsService,
    public translate: TranslateService
  ) { }

  ngOnInit() {
    this.customer = new CustomerFilter();
  }

  ngAfterViewInit() {
    jQuery('input[uk-datepicker]').datepicker();
  }

  ngOnDestroy() {
    this._utils.unsubscribeSub(this._sub);
  }

  onSubmit() {
    this._utils.unsubscribeSub(this._sub);
    map(jQuery('input[uk-datepicker]'), el => {
      const input = jQuery(el)[0];
      this.customer.date_range[input.name.slice().replace('date_', '')] = input.value;
      return el;
    });
    this._sub = this._customersService.get(this.customer).subscribe(
      data => {
        if (isArray(data)) {
          this.update.emit(data);
        }
      }
    );
  }

}
