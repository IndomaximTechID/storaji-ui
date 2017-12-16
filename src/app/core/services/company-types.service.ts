import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { UtilsService } from '../../shared/services/utils.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { NgProgress } from 'ngx-progressbar';
import { Config } from '../../shared/classes/app';

@Injectable()
export class CompanyTypesService {
  _companyTypesUrl = `${new Config().api}/companies/types`;

  public companyTypes: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(private utils: UtilsService, private http: Http, private router: Router, private progress: NgProgress) { }

  get(): void {
    const token = localStorage.getItem('oatoken');
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const options = new RequestOptions({ headers: headers });

    this.http.get(this._companyTypesUrl, options)
               .map((res: Response) => res.json().data)
               .subscribe(
                 data => this.afterRequest(data),
                 error => {console.log(error); }
               );
  }

  beforeRequest(): void {
    this.progress.start();
  }

  afterRequest(data: any): void {
    this.progress.done();
    this.companyTypes.next(data);
  }

}
