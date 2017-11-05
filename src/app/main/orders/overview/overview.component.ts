import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { OrdersService } from '../../../core/services/orders.service';
import { Order } from '../../../core/classes/order';
import 'rxjs/add/operator/switchMap';
import { TranslateService } from '@ngx-translate/core';

import * as pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

declare var numeral: any;
@Component({
  selector: 'orders-overview',
  templateUrl: './overview.component.html',
  styles: []
})
export class OverviewComponent implements OnInit {
  order: Order;
  currency = numeral();

  constructor(
    private routes: ActivatedRoute,
    private _ordersService: OrdersService,
    public translate: TranslateService
  ) { }

  ngOnInit() {
    this.loadOrder();
  }

  loadOrder(){
    this.routes.paramMap
        .switchMap((params: ParamMap) => {
          this._ordersService.find(params.get('id'))
          return this._ordersService.orders;
        })
        .subscribe(
          data => (data instanceof Object) ? this.order = data : data
        );
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
            canvas: [{ type: 'line', x1: 0, y1: 5, x2: 595-2*40, y2: 5, lineWidth: 1 }],
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
              text: this.currency.set(this.order.order_detail.product.selling_price).format('$0,0'),
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
              text: this.currency.set(this.order.order_detail.product.selling_price * this.order.order_detail.amount).format('$0,0'),
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
    }
    pdfMake.createPdf(docDefinitions).download(
      [
        this.translate.instant('module.title.order').toUpperCase(),
        '#',
        this.order.id.split('-')[0].toUpperCase()
      ].join('')
    );
  }

}
