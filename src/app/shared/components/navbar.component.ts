import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
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
export class NavbarComponent implements OnInit {
  user: User;
  navbar: boolean = this.auth.isAuthenticated();
  selectedCurrency: string = this.utils.getCurrentCurrency();
  currencies: Array<any>;

  constructor(
    public app: Config,
    private auth: AuthService,
    private utils: UtilsService,
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

  onChangeCurrency() {
    this.utils.setCurrency(this.selectedCurrency);
  }

  onChangeLanguage(language: string) {
    this.utils.setLang(language);
  }

  initUser() {
    this.user = new User('', '', '', '', '');
  }

  loadData() {
    this.initUser();
    this.auth.detail().subscribe(
      (data: User) => this.user = data,
      (err) => console.log(err)
    );
  }

  onChange(evt: any) {
    this.loadData();
  }

  logout(): void {
    this.auth.logout();
  }

}
