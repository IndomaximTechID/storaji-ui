import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { NgProgressComponent } from '@ngx-progressbar/core';
import { UtilsService } from '../../shared/services/utils.service';
import { Config } from '../../shared/classes/app';
import { CompanyType } from '../classes/company_type';

@Injectable()
export class CompanyTypesService {
  private _companyTypesUrl = `${new Config().api}/companies/types`;

  constructor(
    private _utils: UtilsService,
    private _http: Http,
    private _router: Router,
    private _progress: NgProgressComponent
  ) { }

  get(): Observable<CompanyType[] | CompanyType> {
    const token = localStorage.getItem('oatoken');

    return this._http.get(this._companyTypesUrl, this._utils.makeOptions())
      .map((res: Response) => res.json().data)
      .do(data => this.afterRequest(data));
  }

  beforeRequest(): void {
    this._progress.start();
  }

  afterRequest(data: any): void {
    this._progress.complete();
  }

}
