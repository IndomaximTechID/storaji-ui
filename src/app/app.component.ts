import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Config } from './shared/classes/app';

declare var Offline: any;
declare var jQuery: any;

@Component({
  selector: 'storaji-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(translate: TranslateService) {
    translate.addLangs(['en', 'id']);
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en');
    
    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('en');
  }

  ngOnInit() {
    Offline.options = {checks: {xhr: {url: new Config().api}}};
    Offline.check();
    const overlay = jQuery('.uk-overlay-default');
    Offline.on('confirmed-up', function(){
      overlay.fadeOut('slow');
    });
    Offline.on('confirmed-down', function(){
      overlay.fadeIn('slow');
    });
  }
}
