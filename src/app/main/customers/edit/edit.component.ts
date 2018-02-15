import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { isObject } from 'lodash';
import { CustomersService } from '../../../core/services/customers.service';
import { Customer } from '../../../core/classes/customer';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'storaji-customers-edit',
  templateUrl: './edit.component.html',
  styles: []
})
export class EditComponent implements OnInit {
  customer: Customer = new Customer();

  constructor(
    private routes: ActivatedRoute,
    private _customersService: CustomersService,
    private location: Location,
    public translate: TranslateService
  ) { }

  ngOnInit() {
    this.initCustomer();
  }

  onSubmit() {
    this.routes.paramMap
        .switchMap((params: ParamMap) => {
          this._customersService.update(params.get('id'), this.customer);
          return this._customersService.customers;
        })
        .subscribe(
          data => isObject(data) ? this.customer = data : data
        );
    this.initCustomer();
  }

  onDelete() {
    this.routes.paramMap
        .switchMap((params: ParamMap) => {
          this._customersService.delete(params.get('id'));
          return this._customersService.customers;
        })
        .subscribe(
          data => isObject(data) ? this.customer = data : data
        );

    this.location.back();
    this.initCustomer();
  }

  initCustomer() {
    this.routes.paramMap
        .switchMap((params: ParamMap) => {
          this._customersService.find(params.get('id'));
          return this._customersService.customers;
        })
        .subscribe(
          data => isObject(data) ? this.customer = data : data
        );
  }

}
