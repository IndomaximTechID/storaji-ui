import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Config } from '../../shared/classes/app';

@Component({
  selector: 'storaji-navbar',
  templateUrl: './navbar.component.html',
  styles: [],
  providers: [AuthService]
})
export class NavbarComponent implements OnInit {

  navbar: boolean = this.auth.isAuthenticated();

  constructor(private app: Config, private auth: AuthService) { }

  ngOnInit() {
  }

  logout(): void{
    this.auth.logout();
  }

}
