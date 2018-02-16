import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { isObject } from 'lodash';
import { TranslateService } from '@ngx-translate/core';
import { CustomersService } from '../../../core/services/customers.service';
import { Customer } from '../../../core/classes/customer';
import { Subscription } from 'rxjs/Subscription';
import { UtilsService } from '../../../shared/services/utils.service';

@Component({
  selector: 'storaji-customers-edit',
  templateUrl: './edit.component.html',
  styles: []
})
export class EditComponent implements OnInit, OnDestroy {
  private _sub: Subscription = undefined;

  @Input('customer')
  customer: Customer = new Customer();

  @Output('update')
  change: EventEmitter<Customer> = new EventEmitter<Customer>();

  constructor(
    private _routes: ActivatedRoute,
    private _customersService: CustomersService,
    private _location: Location,
    private _utils: UtilsService,
    public translate: TranslateService
  ) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    this._utils.unsubscribeSub(this._sub);
  }

  onSubmit() {
    this._utils.unsubscribeSub(this._sub);
    this._sub = this._routes.paramMap
        .switchMap((params: ParamMap) => {
          return this._customersService.update(this.customer.id, this.customer);
        })
        .subscribe(
          data => {
            if (isObject(data))  {
              this.customer = data;
              this.change.emit(this.customer);
            }
          }
        );
  }

  onDelete() {
    this._utils.unsubscribeSub(this._sub);
    this._sub = this._customersService.delete(this.customer.id)
      .subscribe(data => this._location.back());
  }

}
