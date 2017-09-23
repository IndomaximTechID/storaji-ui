import { Component, OnInit } from '@angular/core';
import { ProductTypeService } from '../../shared/services/product-type.service';
import { Product } from '../../shared/models/product';
import { ProductType } from '../../shared/models/product-type';

@Component({
  selector: 'product-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
  providers: [ ProductTypeService ]
})
export class AddComponent implements OnInit {
  product: any;
  productForm: any;
  productTypes: ProductType[];

  constructor(private _productTypeService: ProductTypeService) { }

  ngOnInit() {
    this.initProduct();
  }

  onSubmit(){
    console.log(this.product);
    this.initProduct();
    return true;
  }

  initProduct(){
    this._productTypeService.get().subscribe(
      data => this.productTypes = data,
      err => {console.log(err);}
    );
    this.product = new Product();
  }

}
