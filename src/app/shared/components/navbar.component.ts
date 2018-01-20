import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../core/services/auth.service';
import { Config } from '../../shared/classes/app';
import { User } from '../../core/classes/user';

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
  selectedCurrency: string = localStorage.getItem('currency');
  currencies: Array<any>;

  constructor(
    public app: Config,
    private auth: AuthService,
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
    numeral.locales[this.selectedCurrency].currency.symbol.length !== 3
      ? localStorage.setItem('format', '$0,0')
      : localStorage.setItem('format', '0,0 $');

    numeral.locale(this.selectedCurrency);
    localStorage.setItem('currency', this.selectedCurrency);
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
