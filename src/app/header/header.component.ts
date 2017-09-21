import { Component, OnInit } from '@angular/core';
import { Globals } from '../globals';
import { UserService } from '../shared/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [UserService]
})
export class HeaderComponent implements OnInit {

  constructor(
    private globals: Globals,
    private _userService: UserService,
    private _router: Router) { }

  ngOnInit() {
  }

  /**
   * Logout from the app
   *
   */
  logout() {
    this._userService.logout();
    setTimeout(() => this._router.navigate( ['login'] ), 1000);
  }
}
