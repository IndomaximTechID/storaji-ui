import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { ProductType } from '../models/product-type';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class ProductTypeService {
  private _productTypeUrl = 'api/products/types';

  constructor(private http: Http) { }

  get(): Observable<ProductType[]>{
    const token = localStorage.getItem('oatoken');
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + token);
    let options = new RequestOptions({ headers: headers });

    return this.http.get(this._productTypeUrl, options)
    .map((res:Response) => res.json().data)
    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  find(id): Observable<ProductType>{
    const token = localStorage.getItem('oatoken');
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + token);
    let options = new RequestOptions({ headers: headers });

    return this.http.get(this._productTypeUrl + id, options)
    .map((res:Response) => res.json().data)
    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

}
