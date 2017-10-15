import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CustomersService } from '../../../core/services/customers.service';
import { Customer } from '../../../core/classes/customer';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'customers-overview',
  templateUrl: './overview.component.html',
  styles: []
})
export class OverviewComponent implements OnInit {
  customer: Customer;

  constructor(private routes: ActivatedRoute, private _customerService: CustomersService) { }

  ngOnInit() {
    this.loadCustomer();
  }

  loadCustomer(){
    this.routes.paramMap
        .switchMap((params: ParamMap) => {
          this._customerService.find(params.get('id'))
          return this._customerService.customers;
        })
        .subscribe(
          data => (data instanceof Object) ? this.customer = data : data
        );
  }

}
