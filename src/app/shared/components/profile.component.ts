import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { User } from '../../core/classes/user';
import { ProfileService } from '../../core/services/profile.service';

@Component({
  selector: 'storaji-profile-edit',
  templateUrl: './profile.component.html',
  styles: [],
  providers: [ ProfileService ]
})
export class EditProfileComponent implements OnInit {

  @Input() user: User;
  @Output() change: EventEmitter<User> = new EventEmitter<User>();

  constructor(
    private _profileService: ProfileService,
    public translate: TranslateService
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    this._profileService.update(this.user);
    this._profileService.user.subscribe(data => {
      this.change.emit(data);
    });
  }

}
