import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Config } from '../../shared/classes/app';
import { User } from '../../core/classes/user';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'storaji-navbar',
  templateUrl: './navbar.component.html',
  styles: [],
  providers: [AuthService]
})
export class NavbarComponent implements OnInit {

  user: User;
  navbar: boolean = this.auth.isAuthenticated();

  constructor(
    public app: Config,
    private auth: AuthService,
    public translate: TranslateService
  ) { }

  ngOnInit() {
    this.auth.detail().subscribe(
      (data: User) => this.user = data,
      (err) => console.log(err)
    );
  }

  logout(): void {
    this.auth.logout();
  }

}
