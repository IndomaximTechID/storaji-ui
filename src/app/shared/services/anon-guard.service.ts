import { Injectable } from '@angular/core';
import { Router, CanActivate, CanActivateChild, NavigationEnd } from '@angular/router';
import { UserService } from './user.service';

@Injectable()
export class AnonGuardService implements CanActivate, CanActivateChild {

  constructor(private _userService: UserService, private _router: Router) {}

  /**
   * Anon guard service
   */
  canActivate(): boolean {
    if(this._userService.isAuthenticated()){
      this._router.navigate( ['dashboard'] );
      return false;
    }

    return true;
  }

  canActivateChild(): boolean {
    return this.canActivate();
  }
}
