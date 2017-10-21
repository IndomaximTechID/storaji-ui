import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { User } from '../classes/user';
import { UtilsService } from '../../shared/services/utils.service';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class AuthService {
  _authUrl: string = 'http://localhost:8000/api/auth/';

  constructor(
    private utils: UtilsService,
    private http: Http,
    private router: Router,
    public translate: TranslateService
  ) { }

  login(credentials: any): void{
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    this.loading('show');

    this.http.post(this._authUrl + 'login', credentials, options)
        .map((res: Response) => res.json())
        .subscribe(
          data => this.afterLogin(data),
          error => this.failedLogin(error)
        );
  }

  register(credentials: any): void{
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    this.loading('show');

    this.http.post(this._authUrl + 'register', credentials, options)
        .map((res: Response) => res.json())
        .subscribe(
          data => this.afterLogin(data),
          error => this.failedLogin(error)
        );
  }

  detail(): Observable<User>{
    let token = localStorage.getItem('oatoken');
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + token);
    let options = new RequestOptions({ headers: headers });

    return this.http.get(this._authUrl + 'detail', options)
        .map((res: Response) => res.json());
  }

  isAuthenticated(): boolean{
    let token = localStorage.getItem('oatoken');

    if(!token) {
      return false;
    }

    this.detail().subscribe(
      data => <User>data,
      error => this.logout()
    );

    if(!token) {
      return false;
    }

    return true;
  }

  afterLogin(data: any): void{
    localStorage.setItem('oatoken', data.token);

    this.utils.notyf(
      'success',
      this.translate.instant('notification.login.success')
    );

    setTimeout(() => {
      this.loading('hide');
      this.router.navigate(['/dashboard']);
    }, 2000)
  }

  failedLogin(error: any): void {
    this.utils.notyf(
      'failed',
      this.translate.instant('notification.login.failed')
    );
    this.loading('hide');
  }

  logout(): void{
    this.unset();
    this.router.navigate(['/login']);
  }

  unset(): void{
    localStorage.clear();
  }

  loading(act: string): void {
    this.utils.loading({
      selector: 'storaji-login .uk-card',
      action: act
    });
  }
}