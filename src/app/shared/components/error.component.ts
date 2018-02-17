import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Config } from '../classes/app';

@Component({
  selector: 'storaji-error',
  templateUrl: './error.component.html',
  styles: []
})
export class ErrorComponent implements OnInit {

  constructor(private app: Config, private title: Title) { }

  ngOnInit() {
    this.title.setTitle(this.app.name + ': Error 404 - Page Not Found');
  }

}
