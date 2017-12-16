import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CustomersService } from '../../../core/services/customers.service';
import { Customer } from '../../../core/classes/customer';
import 'rxjs/add/operator/switchMap';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'storaji-customers-overview',
  templateUrl: './overview.component.html',
  styles: []
})
export class OverviewComponent implements OnInit {
  customer: Customer;

  constructor(
    private routes: ActivatedRoute,
    private _customerService: CustomersService,
    public translate: TranslateService
  ) { }

  ngOnInit() {
    this.loadCustomer();
  }

  loadCustomer() {
    this.routes.paramMap
        .switchMap((params: ParamMap) => {
          this._customerService.find(params.get('id'));
          return this._customerService.customers;
        })
        .subscribe(
          data => (data instanceof Object) ? this.customer = data : data
        );
  }

}
