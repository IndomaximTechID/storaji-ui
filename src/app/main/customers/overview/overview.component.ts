import { Component, OnInit, OnDestroy } from '@angular/core';
import 'rxjs/add/operator/switchMap';
import { TranslateService } from '@ngx-translate/core';
import { isObject } from 'lodash';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { CustomersService } from '../../../core/services/customers.service';
import { Customer } from '../../../core/classes/customer';
import { UtilsService } from '../../../shared/services/utils.service';

@Component({
  selector: 'storaji-customers-overview',
  templateUrl: './overview.component.html',
  styles: []
})
export class OverviewComponent implements OnInit, OnDestroy {
  private _sub: Subscription = undefined;
  customer: Customer = new Customer();

  constructor(
    private _routes: ActivatedRoute,
    private _utils: UtilsService,
    private _customerService: CustomersService,
    public translate: TranslateService
  ) { }

  ngOnInit() {
    this.loadCustomer();
  }

  ngOnDestroy() {
    this._utils.unsubscribeSub(this._sub);
  }

  loadCustomer() {
    this._utils.unsubscribeSub(this._sub);
    this._sub = this._routes.paramMap
      .switchMap((params: ParamMap) => {
        return this._customerService.find(params.get('id'));
      })
      .subscribe(
      data => isObject(data) ? this.customer = data : data
      );
  }

  onUpdate(customer: Customer) {
    this.customer = customer;
  }

}
