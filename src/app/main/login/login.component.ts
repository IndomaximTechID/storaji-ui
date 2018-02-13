import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs/Subscription';
import { isUndefined } from 'lodash';
import { Config } from '../../shared/classes/app';
import { AuthService } from '../../core/services/auth.service';
import { UtilsService } from '../../shared/services/utils.service';

class Credentials {
  email: string;
  password: string;
}

@Component({
  selector: 'storaji-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit, OnDestroy {

  credentials = new Credentials();
  private _sub: Subscription = undefined;

  constructor(
    public app: Config,
    private _title: Title,
    private _auth: AuthService,
    public translate: TranslateService,
    private _utils: UtilsService
  ) { }

  ngOnInit() {
    this._title.setTitle(this.app.name);
  }

  ngOnDestroy() {
    if (!isUndefined(this._sub)) {
      this._sub.unsubscribe();
    }
  }

  onSubmit() {
    this._sub = this._auth.login(this.credentials).subscribe();
  }

  onChangeLanguage(language: string) {
    this._utils.setLang(language);
  }

}
