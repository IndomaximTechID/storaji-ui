import { Component, OnInit } from '@angular/core';
import { CustomersService } from '../../core/services/customers.service';
import { Customer } from '../../core/classes/customer';
import { TranslateService } from '@ngx-translate/core';

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
      data => (data instanceof Array) ? this.customers = data : data
    );
  }

}
