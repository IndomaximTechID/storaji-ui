import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/services/user.service';

import { Globals } from '../globals';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private _userService: UserService, private globals: Globals) { }

  ngOnInit() {
    this.globals.notyf.confirm('Hi, ' + this._userService.getUserData().name + '!');
  }

}
