import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response, URLSearchParams } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { NgProgress } from 'ngx-progressbar';
import { UtilsService } from '../../shared/services/utils.service';
import { Config } from '../../shared/classes/app';
import { Product } from '../classes/product';
import { ProductFilter } from '../classes/filter';
import { Customer } from '../classes/customer';


@Injectable()
export class ProductsService {
  private _productsUrl = `${new Config().api}/products`;
  private _headers = this._utils.makeHeaders({ withToken: true });

  constructor(
    private _utils: UtilsService,
    private _http: Http,
    private _router: Router,
    private _progress: NgProgress
  ) { }

  get(query?: ProductFilter): Observable<Product[]> {
    this.beforeRequest();
    const options = this._utils.makeOptions(this._headers);

    if (query) {
      const params = new URLSearchParams();
      params.append('filter', JSON.stringify(query));
      options.params = params;
    }

    return this._http.get(`${this._productsUrl}`, options)
      .map((res: Response) => res.json().data)
      .do(
      data => this.afterRequest(),
      error => { console.log(error); }
      );
  }

  find(id: string): Observable<Product> {
    this.beforeRequest();

    return this._http.get(`${this._productsUrl}/${id}`, this._utils.makeOptions(this._headers))
      .map((res: Response) => res.json().data)
      .do(
      data => this.afterRequest(),
      error => { console.log(error); }
      );
  }

  getCustomers(id: string): Observable<Customer[]> {
    this.beforeRequest();

    return this._http.get(`${this._productsUrl}/${id}/customers`, this._utils.makeOptions(this._headers))
      .map((res: Response) => res.json().data)
      .do(
      data => this.afterRequest(),
      error => { console.log(error); }
      );
  }

  add(product: Product): Observable<Product[]> {
    this.beforeRequest();
    const body = JSON.stringify(product);

    return this._http.post(`${this._productsUrl}/add`, body, this._utils.makeOptions(this._headers))
      .map((res: Response) => res.json().data)
      .do(
      data => this.afterRequest(),
      error => { console.log(error); }
      );
  }

  update(id: string, product: Product): Observable<Product> {
    this.beforeRequest();
    const body = JSON.stringify(product);

    return this._http.put(`${this._productsUrl}/${id}/update`, body, this._utils.makeOptions(this._headers))
      .map((res: Response) => res.json().data)
      .do(
      data => this.afterRequest(),
      error => { console.log(error); }
      );
  }

  delete(id: string): Observable<Product[]> {
    this.beforeRequest();

    return this._http.delete(`${this._productsUrl}/${id}/delete`, this._utils.makeOptions(this._headers))
      .map((res: Response) => res.json().data)
      .do(
      data => this.afterRequest(),
      error => { console.log(error); }
      );
  }

  beforeRequest(): void {
    this._progress.start();
  }

  afterRequest(): void {
    this._progress.done();
  }

}
