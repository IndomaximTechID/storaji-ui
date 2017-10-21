import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { UtilsService } from '../../shared/services/utils.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { NgProgressService } from 'ngx-progressbar';

@Injectable()
export class CompanyTypesService {
  _companyTypesUrl: string = 'http://localhost:8000/api/companies/types';

  public companyTypes: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(private utils: UtilsService, private http: Http, private router: Router, private progress: NgProgressService) { }

  get(): void{
    const token = localStorage.getItem('oatoken');
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });

    this.http.get(this._companyTypesUrl, options)
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
    this.companyTypes.next(data);
  }

}
