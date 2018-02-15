import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { isArray } from 'lodash';
import { CustomersService } from '../../core/services/customers.service';
import { Customer } from '../../core/classes/customer';

@Component({
  selector: 'storaji-customers',
  templateUrl: './customers.component.html',
  styles: []
})
export class CustomersComponent implements OnInit {
  customers: Customer[];

  constructor(
    private _customerService: CustomersService,
    public translate: TranslateService
  ) { }

  ngOnInit() {
    this.loadCustomers();
  }

  loadCustomers() {
    this._customerService.get();
    this._customerService.customers.subscribe(
      data => isArray(data) ? this.customers = data : data
    );
  }

}
