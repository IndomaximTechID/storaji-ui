import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../core/services/products.service';
import { CustomersService } from '../../../core/services/customers.service';
import { AutoCompleteService } from '../../../shared/services/autocomplete.service';
import { OrdersService } from '../../../core/services/orders.service';
import { Product } from '../../../core/classes/product';
import { Customer } from '../../../core/classes/customer';
import { Order } from '../../../core/classes/order';
import { OrderDetail } from '../../../core/classes/order-detail';

@Component({
  selector: 'dashboard-order-add',
  templateUrl: './add.component.html',
  styles: []
})
export class DashboardOrderAddComponent implements OnInit {
  private products: Product[];
  private customers: Customer[];
  private order: Order;
  private order_detail: OrderDetail;

  constructor(
    private _productsService: ProductsService,
    private autocomplete: AutoCompleteService,
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
      data => this.products = data,
      err => {console.log(err);}
    );

    this._customersService.get();
    this._customersService.customers.subscribe(
      data => this.customers = data,
      err => {console.log(err);}
    );
    
    this.order = new Order();
  }

}
