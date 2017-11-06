import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CustomersService } from '../../../core/services/customers.service';
import { Customer } from '../../../core/classes/filter';
import { TranslateService } from '@ngx-translate/core';

declare var numeral: any;
declare var jQuery: any;
@Component({
  selector: 'customers-filter',
  templateUrl: './filter.component.html',
  styles: []
})
export class FilterComponent implements OnInit, AfterViewInit {
  customer: Customer;

  constructor(
    private _customersService: CustomersService,
    public translate: TranslateService
  ) { }

  ngOnInit() {
    this.customer = new Customer();
  }

  ngAfterViewInit() {
    jQuery('input[uk-datepicker]').datepicker();
  }

  onSubmit(){
    this._customersService.get(this.customer);
  }

}
