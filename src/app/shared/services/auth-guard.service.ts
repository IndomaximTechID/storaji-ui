import { Injectable } from '@angular/core';
import { Router, CanActivate, CanActivateChild, NavigationEnd } from '@angular/router';
import { UserService } from './user.service';
import { Globals } from '../../globals';

@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild {

  constructor(private _userService: UserService, private _router: Router, private globals: Globals) {}

  /**
   * Auth guard service
   */
  canActivate(): boolean {
    if(!this._userService.isAuthenticated()){
      this._router.navigate( ['login'] );
      return false;
    }
    
    return true;
  }

  canActivateChild(): boolean {
    return this.canActivate();
  }
}
