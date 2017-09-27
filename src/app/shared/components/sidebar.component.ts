import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Config } from '../../shared/classes/app';

@Component({
  selector: 'storaji-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [],
  providers: [AuthService]
})
export class SidebarComponent implements OnInit {
  private sidebar: boolean = this.auth.isAuthenticated();

  constructor(private app: Config, private auth: AuthService) { }

  ngOnInit() {
  }

}
