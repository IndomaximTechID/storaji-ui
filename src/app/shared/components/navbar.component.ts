import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs/Subscription';
import { AuthService } from '../../core/services/auth.service';
import { Config } from '../../shared/classes/app';
import { User } from '../../core/classes/user';
import { UtilsService } from '../services/utils.service';

declare var numeral: any;
@Component({
  selector: 'storaji-navbar',
  templateUrl: './navbar.component.html',
  styles: [],
  providers: [AuthService]
})
export class NavbarComponent implements OnInit, OnDestroy {
  private _sub: Subscription = undefined;

  user: User;
  navbar: boolean = this._auth.isAuthenticated();
  selectedCurrency: string = this._utils.currency;
  currencies: Array<any>;

  constructor(
    public app: Config,
    private _auth: AuthService,
    private _utils: UtilsService,
    public translate: TranslateService
  ) { }

  ngOnInit() {
    this.loadData();
    if (typeof numeral !== 'undefined') {
      this.currencies = Object.keys(numeral.locales).map(id => {
        return {
          id: id,
          symbol: numeral.locales[id].currency.symbol
        };
      });
    }
  }

  ngOnDestroy() {
    this._utils.unsubscribeSub(this._sub);
  }

  onChangeCurrency() {
    this._utils.setCurrency(this.selectedCurrency);
  }

  onChangeLanguage(language: string) {
    this._utils.setLang(language);
  }

  initUser() {
    this.user = new User();
  }

  loadData() {
    this._utils.unsubscribeSub(this._sub);
    this.initUser();
    this._sub = this._auth.detail()
      .subscribe(
      (data: User) => this.user = data,
      (err) => console.log(err)
      );
  }

  onChange(evt: any) {
    this.loadData();
  }

  logout(): void {
    this._auth.logout();
  }

}
