import { Component, OnInit } from '@angular/core';
import { CustomersService } from '../../../core/services/customers.service';
import { Customer } from '../../../core/classes/customer';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'storaji-customers-add',
  templateUrl: './add.component.html',
  styles: []
})
export class AddComponent implements OnInit {
  customer: Customer;

  constructor(
    private _customersService: CustomersService,
    public translate: TranslateService
  ) { }

  ngOnInit() {
    this.initCustomer();
  }

  onSubmit() {
    this._customersService.add(this.customer);
    this.initCustomer();
  }

  initCustomer() {
    this.customer = new Customer();
  }

}
