import { Component, OnInit } from '@angular/core';
import { StatsService } from '../../core/services/stats.service';
import { Stat, TopProduct } from '../../core/classes/stat';

declare var numeral: any;
@Component({
  selector: 'storaji-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {
  private stat: Stat;
  private currency = numeral();
  private top_products: TopProduct[];

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
    
    this._statsService.topProducts();
    this._statsService.top_products.subscribe(
      data => this.top_products = data,
      err => {console.log(err);}
    );
  }

}
