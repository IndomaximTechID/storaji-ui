import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../core/services/products.service';
import { Product } from '../../../core/classes/product';
import { TranslateService } from '@ngx-translate/core';

import * as pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

declare var numeral: any;
@Component({
  selector: 'storaji-products-report',
  templateUrl: './report.component.html',
  styles: []
})
export class ReportComponent implements OnInit {
  products: Product[];
  currency = numeral();

  constructor(
    private _productService: ProductsService,
    public translate: TranslateService
  ) { }

  ngOnInit() {
    this.loadProducts();
  }

  format(): string {
    return localStorage.getItem('format');
  }

  loadProducts() {
    this._productService.get();
    this._productService.products.subscribe(
      data => (data instanceof Array) ? this.products = data : data
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
                text: this.translate.instant('table.name').toUpperCase(),
                style: 'tableHeader'
              },
              {
                text: this.translate.instant('table.type').toUpperCase(),
                style: 'tableHeader'
              },
              {
                text: this.translate.instant('table.sku').toUpperCase(),
                style: 'tableHeader'
              },
              {
                text: this.translate.instant('table.stock').toUpperCase(),
                style: 'tableHeader'
              },
              {
                text: this.translate.instant('form.label.cost').toUpperCase(),
                style: 'tableHeader'
              },
              {
                text: this.translate.instant('form.label.selling-price').toUpperCase(),
                style: 'tableHeader'
              },
              {
                text: this.translate.instant('table.status').toUpperCase(),
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
    await this.products.forEach((item, i) => {
      docDefinitions.content[0].table.body.push([
        i + 1,
        item.name,
        item.sku,
        item.type.name,
        item.stock,
        this.currency.set(item.cost).format(localStorage.getItem('format')),
        this.currency.set(item.selling_price).format(localStorage.getItem('format')),
        (item.stock > 0) ? this.translate.instant('text.in-stock') : this.translate.instant('text.sold-out')
      ]);
    });
    pdfMake.createPdf(docDefinitions).download('products.pdf');
  }

}
