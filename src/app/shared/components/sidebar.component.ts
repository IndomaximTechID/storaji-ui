import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Config } from '../../shared/classes/app';
import { TranslateService } from '@ngx-translate/core';

declare var jQuery: any;
@Component({
  selector: 'storaji-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [],
  providers: [AuthService]
})
export class SidebarComponent implements OnInit, AfterViewInit {
  sidebar: boolean = this.auth.isAuthenticated();

  constructor(
    private app: Config,
    private auth: AuthService,
    public translate: TranslateService
  ) { }

  ngOnInit() { }

  ngAfterViewInit() {
    if (jQuery(window).width() < 960) {
      jQuery('#sidebar').css({
        display: 'none', transform: 'translate(-300px, 0px)', opacity: 0
      });
    }
  }

}
