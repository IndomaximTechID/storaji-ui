import { Component, OnInit } from '@angular/core';
import { StatsService } from '../../core/services/stats.service';
import { Stat } from '../../core/classes/stat';

@Component({
  selector: 'storaji-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {
  private stat = Stat;

  constructor(private _statsService: StatsService) { }

  ngOnInit() {
    this.initStats();
  }

  initStats() {
    this._statsService.get();
    this._statsService.stats.subscribe(
      data => this.stat = data,
      err => {console.log(err);}
    );
  }

}
