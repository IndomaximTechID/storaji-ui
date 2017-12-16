import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Config } from '../../shared/classes/app';
import { AuthService } from '../../core/services/auth.service';
import { Company } from '../../core/classes/company';
import { CompanyTypesService } from '../../core/services/company-types.service';
import { CompanyType } from '../../core/classes/company_type';
import { TranslateService } from '@ngx-translate/core';

class Credentials {
  name: string;
  email: string;
  password: string;
  company: Company = new Company();
}

@Component({
  selector: 'storaji-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {

  credentials = new Credentials();
  companyTypes: CompanyType[];

  constructor(
    public app: Config,
    private title: Title,
    private auth: AuthService,
    private _companyTypes: CompanyTypesService,
    public translate: TranslateService
  ) { }

  ngOnInit() {
    this._companyTypes.get();
    this._companyTypes.companyTypes.subscribe(
      data => (data instanceof Array) ? this.companyTypes = data : data,
      err => {console.log(err); }
    );
    this.title.setTitle(this.app.name);
  }

  onSubmit() {
    this.auth.register(this.credentials);
  }

}
