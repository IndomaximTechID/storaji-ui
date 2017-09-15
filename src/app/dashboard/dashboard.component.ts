import { Component, OnInit } from '@angular/core';

import { Globals } from '../globals';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private globals: Globals) { }

  ngOnInit() {
  }

}
