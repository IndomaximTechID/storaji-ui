import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { NgProgress } from 'ngx-progressbar';
import { UtilsService } from '../../shared/services/utils.service';
import { Config } from '../../shared/classes/app';
import { ProductType } from '../classes/product-type';

@Injectable()
export class ProductTypesService {
  private _productTypesUrl = `${new Config().api}/products/types`;
  private _headers = this._utils.makeHeaders({ withToken: true });

  constructor(
    private _utils: UtilsService,
    private _http: Http,
    private _progress: NgProgress
  ) { }

  get(): Observable<ProductType[]> {
    this.beforeRequest();

    return this._http.get(this._productTypesUrl, this._utils.makeOptions(this._headers))
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
