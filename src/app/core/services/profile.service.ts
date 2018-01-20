import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { NgProgress } from 'ngx-progressbar';
import { UtilsService } from '../../shared/services/utils.service';
import { Config } from '../../shared/classes/app';
import { User } from '../classes/user';


@Injectable()
export class ProfileService {
  _profileUrl = `${new Config().api}/users/profile`;

  public user: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(private utils: UtilsService, private http: Http, private router: Router, private progress: NgProgress) { }

  update(profile: User): void {
    this.beforeRequest();
    const token = localStorage.getItem('oatoken');

    const body = JSON.stringify(profile);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + token);
    const options = new RequestOptions({ headers: headers });

    this.http.put(`${this._profileUrl}`, body, options)
               .map((res: Response) => res.json().data)
               .subscribe(
                 data => this.afterRequest(data),
                 error => {console.log(error); }
               );
  }

  beforeRequest(): void {
    this.progress.start();
  }

  afterRequest(data: User): void {
    this.user.next(data);
    this.progress.done();
  }

}
