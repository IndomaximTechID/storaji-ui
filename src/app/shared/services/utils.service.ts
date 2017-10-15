import { Injectable } from '@angular/core';
declare var $: any;
declare var Notyf: any;

@Injectable()
export class UtilsService {
  _notyf = new Notyf();

  constructor() { }
  loading(options: object){
    const defaultOpts = {
      selector: 'storaji-root',
      action: 'show',
      nice: false
    };

    const opts = Object.assign(defaultOpts, options);

    if( opts.nice ){
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
}