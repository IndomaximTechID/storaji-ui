import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Product } from '../models/product';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class ProductService {
  private _productUrl = 'api/products/';

  constructor(private http: Http) { }

  get(): Observable<Product[]>{
    const token = localStorage.getItem('oatoken');
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + token);
    let options = new RequestOptions({ headers: headers });

    return this.http.get(this._productUrl, options)
    .map((res:Response) => res.json().data)
    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  find(id): Observable<Product>{
    const token = localStorage.getItem('oatoken');
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + token);
    let options = new RequestOptions({ headers: headers });

    return this.http.get(this._productUrl + id, options)
    .map((res:Response) => res.json().data)
    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

}
