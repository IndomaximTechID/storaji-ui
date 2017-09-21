import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

import { Globals } from './globals';

import { Component, OnInit } from '@angular/core';
import {
  Router,
  ActivatedRoute,
  Event as RouterEvent,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError
} from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  loading: boolean = true
  wrapper: boolean = true

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private globals: Globals
  ) {}

  navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.loading = true
    }

    if (event instanceof NavigationEnd) {
      //this.loading = false
      if(event.url.match(/(^\/dashboard$|^\/dashboard\/.+)/gi)){
        this.wrapper = true
      }else{
        this.wrapper = false
      }
      setTimeout(() => this.loading = false, 1000);
    }

    if (event instanceof NavigationCancel) {
      this.loading = false
    }

    if (event instanceof NavigationError) {
      this.loading = false
    }
  }

  ngOnInit() {
    this.router.events
      .filter(event => event instanceof NavigationEnd)
      .map(() => this.activatedRoute)
      .map(route => {
        while (route.firstChild) route = route.firstChild;
        return route;
      })
      .filter(route => route.outlet === 'primary')
      .mergeMap(route => route.data)
      .subscribe((event) => this.titleService.setTitle(event['title'] + ' - ' + this.globals.webtitle));

    this.router.events.subscribe((event: RouterEvent) => this.navigationInterceptor(event))
  }
}
