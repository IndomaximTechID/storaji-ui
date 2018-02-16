import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { User } from '../classes/user';
import { UtilsService } from '../../shared/services/utils.service';
import { Config } from '../../shared/classes/app';
import { isUndefined } from 'lodash';


@Injectable()
export class AuthService {
  private _authUrl = `${new Config().api}/auth`;
  private _detailSub: Subscription = undefined;

  constructor(
    private _utils: UtilsService,
    private _http: Http,
    private _router: Router,
    public translate: TranslateService
  ) { }

  login(credentials: any): Observable<any> {
    this.loading('show');

    return this._http.post(
      `${this._authUrl}/login`,
      credentials,
      this._utils.makeOptions()
    )
      .map((res: Response) => res.json())
      .do(
      data => this.afterLogin(data),
      error => this.failedLogin(error)
      );
  }

  register(credentials: any): Observable<any> {
    this.loading('show');

    return this._http.post(
      `${this._authUrl}/register`,
      credentials,
      this._utils.makeOptions()
    )
      .map((res: Response) => res.json())
      .do(
      data => this.afterLogin(data),
      error => this.failedLogin(error)
      );
  }

  detail(): Observable<User> {
    const headers = this._utils.makeHeaders({ withToken: true });

    return this._http.get(`${this._authUrl}/detail`, this._utils.makeOptions(headers))
      .map((res: Response) => res.json());
  }

  isAuthenticated(): boolean {
    const { token } = this._utils;

    if (!token) {
      return false;
    }

    if (!isUndefined(this._detailSub)) {
      this._detailSub.unsubscribe();
    }

    this._detailSub = this.detail().subscribe(
      data => <User>data,
      error => this.logout()
    );

    if (!token) {
      return false;
    }

    return true;
  }

  afterLogin(data: any): void {
    const { token } = data;
    this._utils.setToken(token);

    this._utils.notyf(
      'success',
      this.translate.instant('notification.login.success')
    );

    setTimeout(() => {
      this.loading('hide');
      this._router.navigate(['/dashboard']);
    }, 2000);
  }

  failedLogin(error: any): void {
    this._utils.notyf(
      'failed',
      this.translate.instant('notification.login.failed')
    );
    this.loading('hide');
  }

  logout(): void {
    this._utils.unsetToken();
    this._router.navigate(['/login']);
  }

  loading(act: string): void {
    this._utils.loading({
      selector: 'storaji-login .uk-card',
      action: act
    });
  }
}
