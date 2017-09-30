import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { UtilsService } from '../../shared/services/utils.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { NgProgressService } from 'ngx-progressbar';


@Injectable()
export class ProductsService {
  private _productsUrl: string = 'api/products/';

  public products: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor( private utils: UtilsService, private http: Http, private router: Router, private progress: NgProgressService) { }

  get(): void{
    this.beforeRequest();
    const token = localStorage.getItem('oatoken');
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + token);
    let options = new RequestOptions({ headers: headers });

    this.http.get(this._productsUrl, options)
               .map((res:Response) => res.json().data)
               .subscribe(
                 data => this.afterRequest(data),
                 error => {console.log(error)}
               );
  }

  find(id: string): void{
    this.beforeRequest();
    const token = localStorage.getItem('oatoken');
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + token);
    let options = new RequestOptions({ headers: headers });

    this.http.get(this._productsUrl + id, options)
               .map((res:Response) => res.json().data)
               .subscribe(
                 data => this.afterRequest(data),
                 error => {console.log(error)}
               );
  }

  add(product: any): void{
    this.beforeRequest();
    const token = localStorage.getItem('oatoken');

    const body = JSON.stringify(product);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + token);
    let options = new RequestOptions({ headers: headers });

    this.http.post(this._productsUrl + 'add', body, options)
               .map((res:Response) => res.json().data)
               .subscribe(
                 data => this.afterRequest(data),
                 error => {console.log(error)}
               );
  }

  beforeRequest(): void{
    this.progress.start();
  }

  afterRequest(data: any): void{
    this.progress.done();
    this.products.next(data);
  }

}
