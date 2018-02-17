import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import 'moment/min/locales.min';
import { Headers, RequestOptions } from '@angular/http';
import { Subscription } from 'rxjs/Subscription';
import { isUndefined } from 'lodash';

declare var $: any;
declare var Notyf: any;
declare var numeral: any;

@Injectable()
export class UtilsService {
  _notyf = new Notyf();
  _moment = moment;

  constructor(
    private translate: TranslateService,
  ) { }

  get token(): string {
    return localStorage.getItem('oatoken');
  }

  setToken(token: string): string {
    localStorage.setItem('oatoken', token);
    return this.token;
  }

  unsetToken(): void {
    localStorage.removeItem('oatoken');
  }

  makeOptions(headers: Headers = this.makeHeaders()): RequestOptions {
    return new RequestOptions({ headers });
  }

  makeHeaders(options: any = {}): Headers {
    const defaultOptions = {
      withToken: false,
      customHeaders: {},
    };
    const opts = Object.assign({}, defaultOptions, options);
    const defaultHeaders = { 'Content-Type': 'application/json' };
    const tokenHeader = opts.withToken
      ? { 'Authorization': `Bearer ${this.token}` }
      : {};
    const headers = Object.assign({}, defaultHeaders, tokenHeader, opts.customHeaders);

    return new Headers(headers);
  }

  loading(options: object): void {
    const defaultOpts = {
      selector: 'storaji-root',
      action: 'show',
      nice: false
    };

    const opts = Object.assign(defaultOpts, options);

    if (opts.nice) {
      return $(opts.selector).LoadingOverlay(opts.action, {
        image: '',
        color: 'rgba(28, 35, 54, 0.45)',
        custom: `<div class="container">
                  <i class="layer"></i>
                  <i class="layer"></i>
                  <i class="layer"></i>
                </div>`
      });
    }

    return $(opts.selector).LoadingOverlay(opts.action, {
      image: '',
      custom: `<div uk-spinner></div>`
    });
  }

  notyf(action: string, msg: string): void {
    switch (action) {
      case 'success':
        this._notyf.confirm(msg);
        break;
      case 'failed':
        this._notyf.alert(msg);
        break;

      default:
        break;
    }
  }

  setLang(language: string): void {
    this.translate.use(language);
    this._moment.locale(language);
    localStorage.setItem('language', language);
  }

  getCurrentLang(): string {
    return localStorage.getItem('language');
  }

  setCurrency(currency: string): void {
    numeral.locales[currency].currency.symbol.length !== 3
      ? localStorage.setItem('format', '$0,0')
      : localStorage.setItem('format', '0,0 $');

    numeral.locale(currency);
    localStorage.setItem('currency', currency);
  }

  get currency(): string {
    return localStorage.getItem('currency');
  }

  get format(): string {
    return localStorage.getItem('format');
  }

  get moment() {
    const lang = this.getCurrentLang();
    !lang
      ? this.setLang('en')
      : this.setLang(lang);
    return this._moment;
  }

  get isoWeekDays() {
    return this._moment.weekdays().map(o => {
      const V = this._moment.weekdays().indexOf(o) + 1;
      return this.moment().isoWeekday(V).format('dddd');
    });
  }

  unsubscribeSub(sub: Subscription) {
    if (!isUndefined(sub)) {
      sub.unsubscribe();
    }
  }
}
