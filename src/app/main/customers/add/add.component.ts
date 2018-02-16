import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs/Subscription';
import { isArray } from 'lodash';
import { CustomersService } from '../../../core/services/customers.service';
import { Customer } from '../../../core/classes/customer';
import { UtilsService } from '../../../shared/services/utils.service';

@Component({
  selector: 'storaji-customers-add',
  templateUrl: './add.component.html',
  styles: []
})
export class AddComponent implements OnInit {
  private _sub: Subscription = undefined;
  
  @Output('update')
  add: EventEmitter<Customer[]> = new EventEmitter<Customer[]>();

  customer: Customer;

  constructor(
    private _customersService: CustomersService,
    private _utils: UtilsService,
    public translate: TranslateService
  ) { }

  ngOnInit() {
    this.initCustomer();
  }

  onSubmit() {
    this._utils.unsubscribeSub(this._sub);
    this._sub = this._customersService.add(this.customer)
      .subscribe(data => {
        if (isArray(data)) {
          this.add.emit(data);
          this.initCustomer();
        }
      });
  }

  initCustomer() {
    this.customer = new Customer();
  }

}
