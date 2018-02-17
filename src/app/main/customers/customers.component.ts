import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { isArray } from 'lodash';
import { Subscription } from 'rxjs/Subscription';
import { CustomersService } from '../../core/services/customers.service';
import { Customer } from '../../core/classes/customer';
import { UtilsService } from '../../shared/services/utils.service';

@Component({
  selector: 'storaji-customers',
  templateUrl: './customers.component.html',
  styles: []
})
export class CustomersComponent implements OnInit, OnDestroy {
  private _sub: Subscription = undefined;
  customers: Customer[];

  constructor(
    private _customerService: CustomersService,
    private _utils: UtilsService,
    public translate: TranslateService
  ) { }

  ngOnInit() {
    this.loadCustomers();
  }

  ngOnDestroy() {
    this._utils.unsubscribeSub(this._sub);
  }

  loadCustomers() {
    this._utils.unsubscribeSub(this._sub);
    this._sub = this._customerService.get().subscribe(
      data => isArray(data) ? this.customers = data : data
    );
  }

  onUpdate(customers: Customer[]) {
    this.customers = isArray(customers) ? customers : this.customers;
  }

}
