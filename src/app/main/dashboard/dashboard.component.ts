import { Component, AfterViewInit, OnInit, ViewChild, ElementRef, HostListener, OnDestroy } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import * as moment from 'moment';
import 'moment/min/locales.min';
import { find, range } from 'lodash';
import { StatsService } from '../../core/services/stats.service';
import { Stat, TopProduct, Graph } from '../../core/classes/stat';
import { UtilsService } from '../../shared/services/utils.service';
import { Subscription } from 'rxjs/Subscription';

declare var numeral: any;
@Component({
  selector: 'storaji-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('chart') graph: ElementRef;

  stat: Stat = new Stat();
  currency = numeral();
  top_products: TopProduct[];
  options: any = {
    renderTo: 'chart',
    title: { text: null },
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
      categories: this._utils.isoWeekDays
    }
  };

  private _translateSub: Subscription = undefined;
  private _sub: Subscription = undefined;
  private _chart: any;

  constructor(
    private _statsService: StatsService,
    public translate: TranslateService,
    private _utils: UtilsService
  ) {
    this._utils.unsubscribeSub(this._translateSub);
    this._translateSub = this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this._setChartSeriesName();
    });
    this._fitChartToParent.bind(this);
  }

  ngOnInit() {
    this.init();
  }

  ngOnDestroy() {
    this._utils.unsubscribeSub(this._translateSub);
    this._utils.unsubscribeSub(this._sub);
  }

  ngAfterViewInit() {
    this._fitChartToParent();
  }

  @HostListener('window:resize') onResize() {
    if (this._checkInstance()) {
      setTimeout(() => {
        this._fitChartToParent();
      }, 200);
    }
  }

  init() {
    this._utils.unsubscribeSub(this._sub);
    this._sub = this._loadStat().subscribe();
  }

  saveInstance(chartInstance: any) {
    this._chart = chartInstance;
    this._setChartSeriesName();
  }

  get format(): string {
    return this._utils.format;
  }

  private _fitChartToParent() {
    this._chart.setSize(this.graph.nativeElement.clientWidth - 90, 400);
  }

  private _loadStat(): Observable<any> {
    return Observable.combineLatest(
      this._statsService.get(),
      this._statsService.topProducts(),
      (stat, topProducts) => {
        this.stat = stat;
        this.top_products = topProducts;
        if (this._checkInstance()) {
          this._chart
            .series[0]
            .setData(this._mapGraphToChart(this.stat.graph.current));
          this._chart
            .series[1]
            .setData(this._mapGraphToChart(this.stat.graph.last));
          this._setChartSeriesName();
          this._fitChartToParent();
        }
      }
    );
  }

  private _checkInstance(): boolean {
    return typeof this._chart !== 'undefined' && typeof this.graph !== 'undefined';
  }

  private _setChartSeriesName() {
    this._chart.update({
      xAxis: {
        categories: this._utils.isoWeekDays
      }
    });
    this._chart.series[0].update({
      name: this.translate.instant('text.graph.current')
    }, false);
    this._chart.series[1].update({
      name: this.translate.instant('text.graph.last')
    }, false);
    this._chart.redraw();
  }

  private _mapGraphToChart(data: any[]) {
    return this._utils.isoWeekDays.map(index => {
      const keys = range(0, 6);
      const _id = this._utils.moment().isoWeekday(index).format('d');
      const pre = keys.map(o => {
        return {
          day: o,
          revenue: data[o]
        };
      });

      const item = find(pre, (v) => {
        const __id = this._utils.moment().isoWeekday(v.day).format('d');
        return _id === __id;
      });

      return typeof item !== 'undefined'
        ? item.revenue
        : 0;
    });
  }
}
