import { Component, AfterViewInit, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import * as moment from 'moment';
import 'moment/min/locales.min';
import { find, range } from 'lodash';
import { StatsService } from '../../core/services/stats.service';
import { Stat, TopProduct, Graph } from '../../core/classes/stat';
import { UtilsService } from '../../shared/services/utils.service';

declare var numeral: any;
@Component({
  selector: 'storaji-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit, AfterViewInit {
  @ViewChild('chart') graph: ElementRef;
  stat: Stat = new Stat();
  options: any = {
    renderTo: 'chart',
    title : { text : null },
    series: [
      {
        name: '',
        data: this.stat.graph.current,
      },
      {
        name: '',
        data: this.stat.graph.last,
      }
    ],
    credits: {
      enabled: false
    },
    yAxis: {
      title: {
        enabled: false
      },
    },
    xAxis: {
      categories: this.utils.isoWeekDays
    }
  };
  chart: any;
  currency = numeral();
  top_products: TopProduct[];

  constructor(
    private _statsService: StatsService,
    public translate: TranslateService,
    private utils: UtilsService
  ) {
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.setChartSeriesName();
    });
    this.fitChartToParent.bind(this);
  }

  ngOnInit() {
    this.initStats();
  }

  ngAfterViewInit() {
    this.fitChartToParent();
  }

  @HostListener('window:resize') onResize() {
    if (this.checkInstance()) {
      setTimeout(() => {
        this.fitChartToParent();
      }, 200);
    }
  }

  fitChartToParent() {
    this.chart.setSize(this.graph.nativeElement.clientWidth - 90, 400);
  }

  saveInstance(chartInstance: any) {
    this.chart = chartInstance;
    this.setChartSeriesName();
  }

  format(): string {
    return this.utils.getCurrentFormat();
  }

  initStats() {
    this._statsService.get();
    this._statsService.stats.subscribe(
      data => {
        this.stat = data;
        if (this.checkInstance()) {
          this.chart
            .series[0]
            .setData(this.mapGraphToChart(this.stat.graph.current));
          this.chart
            .series[1]
            .setData(this.mapGraphToChart(this.stat.graph.last));
          this.setChartSeriesName();
          this.fitChartToParent();
        }
      },
      err => {console.log(err); }
    );

    this._statsService.topProducts();
    this._statsService.top_products.subscribe(
      data => this.top_products = data,
      err => {console.log(err); }
    );
  }

  checkInstance(): boolean {
    return typeof this.chart !== 'undefined' && typeof this.graph !== 'undefined';
  }

  setChartSeriesName() {
    this.chart.update({
      xAxis: {
        categories: this.utils.isoWeekDays
      }
    });
    this.chart.series[0].update({
      name: this.translate.instant('text.graph.current')
    }, false);
    this.chart.series[1].update({
      name: this.translate.instant('text.graph.last')
    }, false);
    this.chart.redraw();
  }

  mapGraphToChart(data: any[]) {
    return this.utils.isoWeekDays.map(index => {
      const keys = range(0, 6);
      const _id = this.utils.moment().isoWeekday(index).format('d');
      const pre = keys.map(o => {
        return {
          day: o,
          revenue: data[o]
        };
      });

      const item = find(pre, (v) => {
        const __id = this.utils.moment().isoWeekday(v.day).format('d');
        return _id === __id;
      });

      return typeof item !== 'undefined'
        ? item.revenue
        : 0;
    });
  }
}
