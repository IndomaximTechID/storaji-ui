import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Globals } from '../../globals';

@Injectable()
export class UserService {
  private _authUrl = 'api/auth/';

  constructor(private http: Http, private globals: Globals) { }

  /**
   * Login to the application
   *
   * @param {string} email The user's login email
   * @param {string} password The user's login password
   * @return {Observable}
   */
  login (email: string, password: string) {

    let body = JSON.stringify({ email, password });
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    this.http.post(this._authUrl + 'login', body, options)
    .map((res:Response) => res.json())
    .subscribe(data => {
      this.success(<any>data);
    },
    error => {
      this.failure(<any>error);
    });
  }

  /**
   * Logout from the application
   *
   */
  logout () {
    this.removeToken();
    this.removeUserData();

    const token = localStorage.getItem('oatoken');
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + token);
    let options = new RequestOptions({ headers: headers });

    this.http.get(this._authUrl + 'detail', options);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('oatoken');
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + token);
    let options = new RequestOptions({ headers: headers });

    this.http.get(this._authUrl + 'detail', options)
    .map((res:Response) => {
      if (res.json().status && res.json().status != 200) this.logout();
      return res.json();
    })
    .subscribe(data => {
      this.setUserData(<any>data);
    },
    error => {
      this.logout();
    });

    if(!token){
      return false;
    }
    return true;
  }

  /**
   * Handles a successful login
   */
  success(obj) {
    this.globals.notyf.confirm('Logged in ...');
    this.setToken(obj.token);
  }

  /**
   * Sets the token in local storage
   */
  setToken(token) {
    localStorage.setItem('oatoken', token);
  }

  /**
   * Removes the token in local storage
   */
  removeToken() {
    localStorage.removeItem('oatoken');
  }

  /**
   * Sets the user in local storage
   */
  setUserData(data) {
    localStorage.setItem('user', JSON.stringify(data));
  }

  /**
   * Gets the user in local storage
   */
  getUserData() {
    return JSON.parse(localStorage.getItem('user'));
  }

  /**
   * Removes the user in local storage
   */
  removeUserData() {
    localStorage.removeItem('user');
  }

  /**
   * handles error
   */
  failure(obj) {
    this.globals.notyf.alert('Error: '+ obj.status + ' ' + obj.statusText);
  }

}
