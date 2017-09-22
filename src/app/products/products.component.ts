import { Component, OnInit } from '@angular/core';
import { ProductService } from '../shared/services/product.service';
import { Product } from '../shared/models/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  providers: [ ProductService ]
})
export class ProductsComponent implements OnInit {

  products: Product[];

  constructor(private _productService: ProductService) { }

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts(){
    this._productService.get().subscribe(
      data => this.products = data,
      err => {console.log(err);}
    );
  }

}
