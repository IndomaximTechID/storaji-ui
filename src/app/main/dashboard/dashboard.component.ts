import { Component, OnInit } from '@angular/core';
import { StatsService } from '../../core/services/stats.service';
import { Stat, TopProduct } from '../../core/classes/stat';
import { TranslateService } from '@ngx-translate/core';

declare var numeral: any;
@Component({
  selector: 'storaji-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {
  stat: Stat;
  currency = numeral();
  top_products: TopProduct[];

  constructor(
    private _statsService: StatsService,
    public translate: TranslateService
  ) { }

  ngOnInit() {
    this.initStats();
  }

  initStats() {
    this._statsService.get();
    this._statsService.stats.subscribe(
      data => this.stat = data,
      err => {console.log(err); }
    );

    this._statsService.topProducts();
    this._statsService.top_products.subscribe(
      data => this.top_products = data,
      err => {console.log(err); }
    );
  }

}
