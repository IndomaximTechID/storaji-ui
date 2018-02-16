import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrdersService } from '../../../core/services/orders.service';
import { Order } from '../../../core/classes/order';
import { TranslateService } from '@ngx-translate/core';
import { isArray } from 'lodash';
import { Subscription } from 'rxjs/Subscription';
import * as pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';
import { UtilsService } from '../../../shared/services/utils.service';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

declare var numeral: any;
@Component({
  selector: 'storaji-orders-report',
  templateUrl: './report.component.html',
  styles: []
})
export class ReportComponent implements OnInit, OnDestroy {
  private _sub: Subscription = undefined;
  orders: Order[];
  currency = numeral();

  constructor(
    private _ordersService: OrdersService,
    public translate: TranslateService,
    private _utils: UtilsService
  ) { }

  ngOnInit() {
    this.loadOrders();
  }

  ngOnDestroy() {
    this._utils.unsubscribeSub(this._sub);
  }

  loadOrders() {
    this._utils.unsubscribeSub(this._sub);
    this._sub = this._ordersService.get().subscribe(
      data => isArray(data) ? this.orders = data : data
    );
  }

  onUpdate(orders: Order[]) {
    this.orders = isArray(orders) ? orders : this.orders;
  }

  format(): string {
    return this._utils.format;
  }

  async save() {
    const docDefinitions = {
      pageSize: 'A4',
      pageOrientation: 'landscape',
      content: [{
        style: 'tableExample',
        table: {
          headerRows: 1,
          body: [
            [
              {
                text: this.translate.instant('table.order.id').toUpperCase(),
                style: 'tableHeader'
              },
              {
                text: this.translate.instant('table.product.name').toUpperCase(),
                style: 'tableHeader'
              },
              {
                text: this.translate.instant('table.customer.name').toUpperCase(),
                style: 'tableHeader'
              },
              {
                text: this.translate.instant('form.label.amount').toUpperCase(),
                style: 'tableHeader'
              },
              {
                text: this.translate.instant('form.label.price').toUpperCase(),
                style: 'tableHeader'
              },
              {
                text: this.translate.instant('form.label.total').toUpperCase(),
                style: 'tableHeader'
              },
              {
                text: this.translate.instant('table.date').toUpperCase(),
                style: 'tableHeader'
              }
            ]
          ]
        },
        layout: {
          hLineWidth: (i: any, node: any) => {
            return (i === 0 || i === node.table.body.length) ? 2 : 1;
          },
          vLineWidth: (i: any, node: any) => {
            return (i === 0 || i === node.table.widths.length) ? 2 : 1;
          },
          hLineColor: (i: any, node: any) => {
            return (i === 0 || i === node.table.body.length) ? 'black' : 'gray';
          },
          vLineColor: (i: any, node: any) => {
            return (i === 0 || i === node.table.widths.length) ? 'black' : 'gray';
          }
        }
      }],
      styles: {
        tableExample: {
          margin: [0, 5, 0, 15]
        },
        tableHeader: {
          bold: true,
          fontSize: 13,
          color: 'black'
        }
      }
    };
    await this.orders.forEach((item, i) => {
      docDefinitions.content[0].table.body.push([
        ['#', item.id.split('-')[0]].join(''),
        item.order_detail.product.name,
        item.customer.full_name,
        item.order_detail.amount,
        this.currency.set(item.order_detail.product.selling_price)
          .format(this._utils.format),
        this.currency.set(item.order_detail.amount * item.order_detail.product.selling_price)
          .format(this._utils.format),
        item.created_at,
      ]);
    });
    pdfMake.createPdf(docDefinitions).download('orders.pdf');
  }

}
