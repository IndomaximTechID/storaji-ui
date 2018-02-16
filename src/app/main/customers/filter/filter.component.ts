import { Component, OnInit, AfterViewInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as _ from 'lodash';
import { CustomersService } from '../../../core/services/customers.service';
import { CustomerFilter } from '../../../core/classes/filter';

declare var numeral: any;
declare var jQuery: any;
@Component({
  selector: 'storaji-customers-filter',
  templateUrl: './filter.component.html',
  styles: []
})
export class FilterComponent implements OnInit, AfterViewInit {
  customer: CustomerFilter;

  constructor(
    private _customersService: CustomersService,
    public translate: TranslateService
  ) { }

  ngOnInit() {
    this.customer = new CustomerFilter();
  }

  ngAfterViewInit() {
    jQuery('input[uk-datepicker]').datepicker();
  }

  onSubmit() {
    _.map(jQuery('input[uk-datepicker]'), el => {
      const input = jQuery(el)[0];
      this.customer.date_range[input.name.slice().replace('date_', '')] = input.value;
      return el;
    });
    this._customersService.get(this.customer);
  }

}
