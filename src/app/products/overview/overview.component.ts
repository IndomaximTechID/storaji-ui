import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ProductService } from '../../shared/services/product.service';
import { Product } from '../../shared/models/product';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'product-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css'],
  providers: [ ProductService ]
})
export class ProductOverviewComponent implements OnInit {
  product: Product;

  constructor(private route: ActivatedRoute, private _productService: ProductService) { }

  ngOnInit() {
    this.getProduct();
  }

  getProduct(){
    this.route.paramMap
    .switchMap((params: ParamMap) => this._productService.find(+params.get('id')))
    .subscribe(
      data => this.product = data,
      err => {console.log(err);}
    );
  }

}
