import * as _ from 'lodash';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../core/services/products.service';
import { CustomersService } from '../../../core/services/customers.service';
import { OrdersService } from '../../../core/services/orders.service';
import { Product } from '../../../core/classes/product';
import { Customer } from '../../../core/classes/customer';
import { Order } from '../../../core/classes/order';
import { OrderDetail } from '../../../core/classes/order-detail';

@Component({
  selector: 'orders-add',
  templateUrl: './add.component.html',
  styles: []
})
export class AddComponent implements OnInit {
  products: Product[];
  customers: Customer[];
  order: Order;

  constructor(
    private _productsService: ProductsService,
    private _customersService: CustomersService,
    private _ordersService: OrdersService
  ) { }

  ngOnInit() {
    this.init();
  }

  onSubmit(){
    this._ordersService.add(this.order);
    this.init();
  }

  init(){
    this._productsService.get();
    this._productsService.products.subscribe(
      data => {
        const available_stock: Product[] = [];
        _.forEach(data, (product: Product) => {
          if (product.stock > 0) available_stock.push(product);
        });
        this.products = available_stock;
      },
      err => {console.log(err);}
    );

    this._customersService.get();
    this._customersService.customers.subscribe(
      data => this.customers = data,
      err => {console.log(err);}
    );
    
    this.order = new Order();
  }

  available_stock(e: any) {
    if (e.target.value > this.order.order_detail.product.stock) return e.target.value = this.order.order_detail.product.stock;
  }

}
