import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response, URLSearchParams } from '@angular/http';
import { Router } from '@angular/router';
import { NgProgress } from 'ngx-progressbar';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { UtilsService } from '../../shared/services/utils.service';
import { Config } from '../../shared/classes/app';
import { OrderFilter } from '../classes/filter';
import { Order } from '../classes/order';


@Injectable()
export class OrdersService {
  private _ordersUrl = `${new Config().api}/orders`;
  private _headers = this._utils.makeHeaders({ withToken: true });

  constructor(
    private _utils: UtilsService,
    private _http: Http,
    private _router: Router,
    private _progress: NgProgress
  ) { }

  get(query?: OrderFilter): Observable<Order[]> {
    this.beforeRequest();
    const options = this._utils.makeOptions(this._headers);

    if (query) {
      const params = new URLSearchParams();
      params.append('filter', JSON.stringify(query));
      options.params = params;
    }

    return this._http.get(this._ordersUrl, options)
      .map((res: Response) => res.json().data)
      .do(
      data => this.afterRequest(data),
      error => { console.log(error); }
      );
  }

  find(id: string): Observable<Order> {
    this.beforeRequest();

    return this._http.get(`${this._ordersUrl}/${id}`, this._utils.makeOptions(this._headers))
      .map((res: Response) => res.json().data)
      .do(
      data => this.afterRequest(data),
      error => { console.log(error); }
      );
  }

  add(order: Order[]): Observable<Order[]> {
    this.beforeRequest();
    const body = JSON.stringify(order);

    return this._http.post(`${this._ordersUrl}/add`, body, this._utils.makeOptions(this._headers))
      .map((res: Response) => res.json().data)
      .do(
      data => this.afterRequest(data),
      error => { console.log(error); }
      );
  }

  delete(id: string): Observable<Order[]> {
    this.beforeRequest();

    return this._http.delete(`${this._ordersUrl}/${id}/delete`, this._utils.makeOptions(this._headers))
      .map((res: Response) => res.json().data)
      .do(
      data => this.afterRequest(data),
      error => { console.log(error); }
      );
  }

  beforeRequest(): void {
    this._progress.start();
  }

  afterRequest(data: any): void {
    this._progress.done();
  }

}
