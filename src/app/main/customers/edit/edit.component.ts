import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CustomersService } from '../../../core/services/customers.service';
import { Customer } from '../../../core/classes/customer';

@Component({
  selector: 'customers-edit',
  templateUrl: './edit.component.html',
  styles: []
})
export class EditComponent implements OnInit {
  private customer: Customer = new Customer();

  constructor(private routes: ActivatedRoute, private _customersService: CustomersService) { }

  ngOnInit() {
    this.initCustomer();
  }

  onSubmit(){
    this.routes.paramMap
        .switchMap((params: ParamMap) => {
          this._customersService.update(params.get('id'), this.customer)
          return this._customersService.customers;
        })
        .subscribe(
          data => (data instanceof Object) ? this.customer = data : data
        );
    this.initCustomer();
  }

  initCustomer(){
    this.routes.paramMap
        .switchMap((params: ParamMap) => {
          this._customersService.find(params.get('id'))
          return this._customersService.customers;
        })
        .subscribe(
          data => (data instanceof Object) ? this.customer = data : data
        );
  }

}
