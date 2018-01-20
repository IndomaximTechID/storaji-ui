import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import { Config } from './shared/classes/app';

declare const Offline: any;
declare const jQuery: any;
declare const UIkit: any;
declare const ipcRenderer: any;

@Component({
  selector: 'storaji-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(translate: TranslateService, private http: HttpClient) {
    if (!localStorage.getItem('currency')) {
      localStorage.setItem('currency', 'en');
      localStorage.setItem('format', '$0,0');
    }
    const getGlobal = this.http.get('assets/i18n/_i18n.json');
    const getDefault = this.http.get('assets/i18n/en.json');

    Observable.combineLatest(getGlobal, getDefault).subscribe(
      (res) => {
        // this language will be used as a fallback when a translation isn't found in current language
        translate.setTranslation('_i18n', Object.assign({}, res[0], res[1]));
        translate.addLangs(['_i18n', ...Object.keys(res[0])]);
        translate.setDefaultLang('_i18n');

        // the lang to use, if the lang isn't available, it will use the current loader to get them
        translate.use('en');
      }
    );
  }

  ngOnInit() {
    Offline.options = {checks: {xhr: {url: new Config().api}}};
    Offline.check();
    const overlay = jQuery('.uk-overlay-default');
    Offline.on('confirmed-up', () => {
      overlay.fadeOut('slow');
    });
    Offline.on('confirmed-down', () => {
      overlay.fadeIn('slow');
    });
  }
}
