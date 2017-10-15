import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Config } from '../../shared/classes/app';
import { AuthService } from '../../core/services/auth.service';

class Credentials {
  email: string;
  password: string;
}

@Component({
  selector: 'storaji-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  credentials = new Credentials();

  constructor(public app: Config, private title: Title, private auth: AuthService) { }

  ngOnInit() {
    this.title.setTitle(this.app.name);
  }

  onSubmit(){
    this.auth.login(this.credentials);
  }

}
