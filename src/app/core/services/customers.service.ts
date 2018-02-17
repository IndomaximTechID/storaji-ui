import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response, URLSearchParams } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { NgProgress } from 'ngx-progressbar';
import { UtilsService } from '../../shared/services/utils.service';
import { Config } from '../../shared/classes/app';
import { CustomerFilter } from '../classes/filter';
import { Customer } from '../classes/customer';


@Injectable()
export class CustomersService {
  private _customersUrl = `${new Config().api}/customers`;
  private _headers = this._utils.makeHeaders({ withToken: true });

  constructor(
    private _utils: UtilsService,
    private _http: Http,
    private _router: Router,
    private _progress: NgProgress
  ) { }

  get(query?: CustomerFilter): Observable<Customer[]> {
    this.beforeRequest();
    const options = this._utils.makeOptions(this._headers);

    if (query) {
      const params = new URLSearchParams();
      params.append('filter', JSON.stringify(query));
      options.params = params;
    }

    return this._http.get(`${this._customersUrl}`, options)
      .map((res: Response) => res.json().data)
      .do(
      data => this.afterRequest(data),
      error => { console.log(error); }
      );
  }

  find(id: string): Observable<Customer> {
    this.beforeRequest();

    return this._http.get(`${this._customersUrl}/${id}`, this._utils.makeOptions(this._headers))
      .map((res: Response) => res.json().data)
      .do(
      data => this.afterRequest(data),
      error => { console.log(error); }
      );
  }

  add(customer: any): Observable<Customer[]> {
    this.beforeRequest();
    const body = JSON.stringify(customer);

    return this._http.post(`${this._customersUrl}/add`, body, this._utils.makeOptions(this._headers))
      .map((res: Response) => res.json().data)
      .do(
      data => this.afterRequest(data),
      error => { console.log(error); }
      );
  }

  update(id: string, customer: Customer): Observable<Customer> {
    this.beforeRequest();
    const body = JSON.stringify(customer);

    return this._http.put(`${this._customersUrl}/${id}/update`, body, this._utils.makeOptions(this._headers))
      .map((res: Response) => res.json().data)
      .do(
      data => this.afterRequest(data),
      error => { console.log(error); }
      );
  }

  delete(id: string): Observable<Customer[]> {
    this.beforeRequest();

    return this._http.delete(`${this._customersUrl}/${id}/delete`, this._utils.makeOptions(this._headers))
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
