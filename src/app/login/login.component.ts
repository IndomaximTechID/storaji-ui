import { Component, OnInit } from '@angular/core';
import { Globals } from '../globals';
import { UserService } from '../shared/services/user.service';
import { Router } from '@angular/router';

declare var Notyf: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {

  notyf = new Notyf({delay: 4000});

  constructor(
    private globals: Globals,
    private _userService: UserService,
    private _router: Router) { }

  ngOnInit() {
  }

  /**
   * Login to the app
   *
   * @param {Event} event
   * @param {string} email The user's login email
   * @param {string} password The user's login password
   */
  login(event, email, password) {
    event.preventDefault();

    // login
    this._userService.login(email, password);
    setTimeout(() => this._router.navigate( ['dashboard'] ), 1000);
  }
}
