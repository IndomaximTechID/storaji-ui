import { Component, OnInit, OnDestroy } from '@angular/core';
import { CustomersService } from '../../../core/services/customers.service';
import { Customer } from '../../../core/classes/customer';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs/Subscription';
import { isArray } from 'lodash';
import * as pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';
import { UtilsService } from '../../../shared/services/utils.service';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'storaji-customers-report',
  templateUrl: './report.component.html',
  styles: []
})
export class ReportComponent implements OnInit, OnDestroy {
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

  onUpdate(customers: Customer[]) {
    this.customers = isArray(customers) ? customers : this.customers;
  }

  loadCustomers() {
    this._utils.unsubscribeSub(this._sub);
    this._sub = this._customerService.get().subscribe(
      data => isArray(data) ? this.customers = data : data
    );
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
                text: this.translate.instant('table.number').toUpperCase(),
                style: 'tableHeader'
              },
              {
                text: this.translate.instant('table.customer.name').toUpperCase(),
                style: 'tableHeader'
              },
              {
                text: this.translate.instant('table.company.name').toUpperCase(),
                style: 'tableHeader'
              },
              {
                text: this.translate.instant('form.label.email').toUpperCase(),
                style: 'tableHeader'
              },
              {
                text: [
                  this.translate.instant('form.label.postal-code'),
                  this.translate.instant('form.label.city')
                ].join(', ').toUpperCase(),
                style: 'tableHeader'
              },
              {
                text: this.translate.instant('form.label.country').toUpperCase(),
                style: 'tableHeader'
              },
              {
                text: this.translate.instant('form.label.address').toUpperCase(),
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
    await this.customers.forEach((item, i) => {
      docDefinitions.content[0].table.body.push([
        i + 1,
        item.full_name,
        item.company_name,
        item.email,
        [item.postal_code, item.city].join(', '),
        item.country,
        <any>item.address
      ]);
    });
    pdfMake.createPdf(docDefinitions).download('customers.pdf');
  }

}
