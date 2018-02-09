import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Config } from '../../shared/classes/app';
import { AuthService } from '../../core/services/auth.service';
import { TranslateService } from '@ngx-translate/core';
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
export class LoginComponent implements OnInit {

  credentials = new Credentials();

  constructor(
    public app: Config,
    private title: Title,
    private auth: AuthService,
    public translate: TranslateService,
    private utils: UtilsService
  ) { }

  ngOnInit() {
    this.title.setTitle(this.app.name);
  }

  onSubmit() {
    this.auth.login(this.credentials);
  }

  onChangeLanguage(language: string) {
    this.utils.setLang(language);
  }

}
