import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ProductsService } from '../../../core/services/products.service';
import { ProductTypesService } from '../../../core/services/product-types.service';
import { Product } from '../../../core/classes/product';
import { ProductType } from '../../../core/classes/product-type';
import { AutoCompleteService } from '../../../shared/services/autocomplete.service';

@Component({
  selector: 'products-edit',
  templateUrl: './edit.component.html',
  styles: []
})
export class EditComponent implements OnInit {
  private product: Product = new Product();
  private productTypes: ProductType[];

  constructor(private routes: ActivatedRoute, private _productsService: ProductsService, private _productTypesService: ProductTypesService, private autocomplete: AutoCompleteService) { }

  ngOnInit() {
    this.initProduct();
  }

  onSubmit(){
    this.product.type_id = this.product.type.id;
    this.routes.paramMap
        .switchMap((params: ParamMap) => {
          this._productsService.update(params.get('id'), this.product)
          return this._productsService.products;
        })
        .subscribe(
          data => (data instanceof Object) ? this.product = data : data
        );
    this.initProduct();
  }

  initProduct(){
    this._productTypesService.get();
    this._productTypesService.productTypes.subscribe(
      data => this.productTypes = data,
      err => {console.log(err);}
    );
    
    this.routes.paramMap
        .switchMap((params: ParamMap) => {
          this._productsService.find(params.get('id'))
          return this._productsService.products;
        })
        .subscribe(
          data => (data instanceof Object) ? this.product = data : data
        );
  }

}
