import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

declare var $: any;
declare var Notyf: any;
declare var numeral: any;

@Injectable()
export class UtilsService {
  _notyf = new Notyf();

  constructor(
    private translate: TranslateService,
  ) { }
  loading(options: object): void {
    const defaultOpts = {
      selector: 'storaji-root',
      action: 'show',
      nice: false
    };

    const opts = Object.assign(defaultOpts, options);

    if ( opts.nice ) {
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

  getCurrentCurrency(): string {
    return localStorage.getItem('currency');
  }

  getCurrentFormat(): string {
    return localStorage.getItem('format');
  }
}
