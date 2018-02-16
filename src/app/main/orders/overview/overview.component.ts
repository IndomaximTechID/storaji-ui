import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';
import { Subscription } from 'rxjs/Subscription';
import { TranslateService } from '@ngx-translate/core';
import * as pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';
import { isObject } from 'lodash';
import { OrdersService } from '../../../core/services/orders.service';
import { Order } from '../../../core/classes/order';
import { UtilsService } from '../../../shared/services/utils.service';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

declare var numeral: any;
@Component({
  selector: 'storaji-orders-overview',
  templateUrl: './overview.component.html',
  styles: []
})
export class OverviewComponent implements OnInit, OnDestroy {
  private _findSub: Subscription;
  private _delSub: Subscription;

  order: Order;
  currency = numeral();

  constructor(
    private _routes: ActivatedRoute,
    private _location: Location,
    private _ordersService: OrdersService,
    public translate: TranslateService,
    private _utils: UtilsService
  ) { }

  ngOnInit() {
    this.loadOrder();
  }

  ngOnDestroy() {
    this._utils.unsubscribeSub(this._findSub);
    this._utils.unsubscribeSub(this._delSub);
  }

  loadOrder() {
    this._utils.unsubscribeSub(this._findSub);
    this._findSub = this._routes.paramMap
      .switchMap((params: ParamMap) => {
        return this._ordersService.find(params.get('id'));
      })
      .subscribe(
      data => isObject(data) ? this.order = data : data
      );
  }

  onDelete() {
    this._utils.unsubscribeSub(this._delSub);
    this._delSub = this._routes.paramMap
      .switchMap((params: ParamMap) => {
        return this._ordersService.delete(this.order.id);
      })
      .subscribe(data => this._location.back());
  }

  format(): string {
    return this._utils.format;
  }

  save() {
    const docDefinitions = {
      pageSize: 'A5',
      pageOrientation: 'landscape',
      content: [
        {
          text: this.translate.instant('table.order.id').toUpperCase(),
          style: 'header'
        },
        {
          text: ['#', this.order.id.split('-')[0].toUpperCase()].join(''),
          style: 'subheader'
        },
        {
          canvas: [{ type: 'line', x1: 0, y1: 5, x2: 595 - 2 * 40, y2: 5, lineWidth: 1 }],
          margin: [0, 10],
        },
        {
          columns: [
            {
              text: this.translate.instant('table.product.name').toUpperCase()
            },
            {
              text: this.translate.instant('form.label.customer-name').toUpperCase()
            }
          ],
          style: 'columns'
        },
        {
          columns: [
            {
              text: this.order.order_detail.product.name,
              style: 'item',
            },
            {
              text: this.order.customer.full_name,
              style: 'item'
            }
          ],
          style: ['columns', 'itemColumn']
        },
        {
          columns: [
            {
              text: this.translate.instant('form.label.amount').toUpperCase()
            },
            {
              text: this.translate.instant('form.label.price').toUpperCase()
            }
          ],
          style: 'columns'
        },
        {
          columns: [
            {
              text: this.order.order_detail.amount,
              style: 'item'
            },
            {
              text: this.currency.set(this.order.order_detail.product.selling_price).format(this._utils.format),
              style: 'item'
            }
          ],
          style: ['columns', 'itemColumn']
        },
        {
          columns: [
            {
              text: this.translate.instant('form.label.total').toUpperCase()
            },
            {
              text: this.translate.instant('table.date').toUpperCase()
            }
          ],
          style: 'columns'
        },
        {
          columns: [
            {
              text: this
                .currency
                .set(this.order.order_detail.product.selling_price * this.order.order_detail.amount)
                .format(this._utils.format),
              style: 'item'
            },
            {
              text: this.order.created_at,
              style: 'item'
            }
          ],
          style: ['columns', 'itemColumn']
        },
      ],
      styles: {
        header: {
          fontSize: 15
        },
        subheader: {
          fontSize: 18,
          bold: true
        },
        item: {
          fontSize: 15,
          bold: true
        },
        itemColumn: {
          margin: [0, 0, 0, 15]
        },
        columns: {
          columnGap: 15,
        }
      }
    };
    pdfMake.createPdf(docDefinitions).download(
      [
        this.translate.instant('module.title.order').toUpperCase(),
        '#',
        this.order.id.split('-')[0].toUpperCase()
      ].join('')
    );
  }

}
