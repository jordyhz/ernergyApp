
import { Component, OnInit, OnDestroy } from '@angular/core';
import { EChartOption } from 'echarts';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { ResizedEvent } from 'angular-resize-event';
import { MetricService } from '../../dashboard/metric.service';
import { MetricResponse } from '../../../model/metricresponse';
import { MetricResponseBody } from '../../../model/metricresponsebody';
import { DetailTilesComponent } from '../../../components/detail-tiles/detail-tiles.component';


@Component({
    selector: 'app-widget-summary01',
    templateUrl: './summary01.component.html',
    styleUrls: ['./summary01.component.scss']
  })
  export class Summary01Component implements OnInit, OnDestroy {
  
      
      public detailTileOptions:Array<any> = new Array<any>();
  
      public metric1003Options: EChartOption = {};
      public metric1007Options: EChartOption = {};
      public metric1011Options: EChartOption = {};
  
      public metric1003DataSeries: Array<number> = [0, 0, 0, 0, 0, 0];
      public metric1007DataSeries: Array<number> = [0, 0, 0, 0, 0, 0];
      public metric1011DataSeries: Array<number> = [0, 0, 0, 0, 0, 0];
  
  
      public interval: any = {};
  
      public themeDarkClass: string = "";
      private ngUnsubscribe = new Subject();
  
      public metricResponse : MetricResponse  ;
      public respBody : MetricResponseBody[] = [] ;
  
      index : number = 1 ;
  
          constructor(private toastr: ToastrService, private metricService: MetricService, ) 
              { }
  
      ngOnInit() {
  
          this.metricService.getMetric_1003(27).subscribe( res => {
              let metricResponse =  {
                  metricName : (res as any).metricName,
                  body : (res as any).body
              };      
              //let params = metricResponse['body'].map(res => res.param) ;
              let metricValue = null ;
              metricValue = this.getMetricValue(metricResponse) ;
              let tileOption =
              {
                  title:metricResponse.metricName,
                  value:metricValue,
                  details:"deneme... ",
                  options: this.metric1003Options
              }
              this.detailTileOptions.push(tileOption);
  
          } 
          ) ;
        
          this.metricService.getMetric_1007(27).subscribe( res => {
              let metricResponse =  {
                  metricName : (res as any).metricName,
                  body : (res as any).body
              };      
              let metricValue = null ;
               metricValue = this.getMetricValue(metricResponse) ;
              let tileOption =
              {
                  title:metricResponse.metricName,
                  value:metricValue,
                  details:"Önceki aydan %5 fazla... ",
                  options: this.metric1007Options
              }
              this.detailTileOptions.push(tileOption);
          } 
          ) ;
          this.metricService.getMetric_1011(27).subscribe( res => {
              let metricResponse =  {
                  metricName : (res as any).metricName,
                  body : (res as any).body
              };      
              let metricValue = null ;
               metricValue = this.getMetricValue(metricResponse) ;
  
              let tileOption =
              {
                  title:metricResponse.metricName,
                  value:metricValue,
                  details:"deneme... ",
                  options: this.metric1011Options
              }
              this.detailTileOptions.push(tileOption);
          } 
          ) ;
          console.log("---DETAIL TILE OPTION --") ; 
          console.log(this.detailTileOptions) ; 
  
          this.showToastr() ;
          let that = this;
          setTimeout(function () {
              that.showToastr();
          }, 5000);
  
          this.chartIntervals();
      }
  
      ngOnDestroy() {
          if (this.interval) {
              clearInterval(this.interval);
          }
          this.ngUnsubscribe.next();
          this.ngUnsubscribe.complete();
      }
  
      chartIntervals() {
          let toggle = true;
          let that = this;
          this.interval = setInterval(function () {
              //Fake Toggling 
              if (toggle) {
                  that.index = that.index + 55 ; 
                  toggle = !toggle;
              } else {
                  that.index = that.index - 55 ; 
                  toggle = !toggle;
              }
           
              /*
              let rand = that.randomInt(250,500);
              if (!rand) {
                  rand = 250;
              }
              */
              //that.energyOptionsSeries.push(rand);
  
  
              that.metricService.getMetric_1011(27).subscribe( res => {
                  let metricResponse =  {
                      metricName : (res as any).metricName,
                      body : (res as any).body
                  };      
                  let metricValue = that.getMetricValue(metricResponse) ;
                  metricValue = parseFloat(metricValue) + that.index ;  // fake adjustment will be romeved
  
                  that.metric1011DataSeries.shift();
                  that.metric1011DataSeries.push(metricValue);
              
                  that.metric1011Options = that.loadLineAreaChartOptions(that.metric1011DataSeries, "#f79647", "#fac091");
                  that.detailTileOptions[0].value = metricValue ;
                  that.detailTileOptions[0].options = that.metric1011Options;
              } );
              
              /*
              that.LightsSeries.shift();
              rand = that.randomInt(1, 10);
              if (!rand) {
                  rand = 1;
              }
         
              that.LightsSeries.push(rand);
              */
  
             that.metricService.getMetric_1007(27).subscribe( res => {
              let metricResponse =  {
                  metricName : (res as any).metricName,
                  body : (res as any).body
                 };     
  
                  let metricValue = that.getMetricValue(metricResponse) ;
                  metricValue = ( parseFloat(metricValue) /100000 ) + that.index ; //  will removed
                  that.metric1007DataSeries.shift();
                  that.metric1007DataSeries.push(metricValue);
  
                  that.metric1007Options = that.loadLineAreaChartOptions(that.metric1007DataSeries, "#604a7b", "#a092b0");
                  that.detailTileOptions[1].value = metricValue ;
                  that.detailTileOptions[1].options = that.metric1007Options;
               } );
  
              /*
              that.TempratureSeries.shift();
              rand = that.randomInt(10, 25);
              if (!rand) {
                  rand = 10;
              }
              that.TempratureSeries.push(rand);
              */
  
             that.metricService.getMetric_1003(27).subscribe( res => {
              let metricResponse =  {
                  metricName : (res as any).metricName,
                  body : (res as any).body
                 };     
                 let metricValue = that.getMetricValue(metricResponse) ;
                 metricValue = parseFloat(metricValue) + that.index ;   //  will removed
  
                 that.metric1003DataSeries.shift();
                 that.metric1003DataSeries.push(metricValue);
  
                  that.metric1003Options = that.loadLineAreaChartOptions(that.metric1003DataSeries, "#4aacc5", "#92cddc");
                  that.detailTileOptions[2].value =  metricValue  ;
                  that.detailTileOptions[2].options = that.metric1003Options;
          } );
              
          }, 2500);
  
      }
  
      showToastr() {
          this.toastr.info('Hello, welcome to Innovative Square IoT Dashboard.', undefined, {
              closeButton: true,
              positionClass: 'toast-top-right'
          });
      }
  
      /**
       * Setting options for header charts
       */
      setChartOptions(data, color) {
          let chartOption: any = {};
  
          chartOption.chartType = 'bar';
          chartOption.chartLegend = false;
  
          chartOption.chartData = [
              {
                  data: data
              }
          ];
  
          chartOption.chartColors = [
              {
                  backgroundColor: color,
                  borderColor: color,
                  borderWidth: 1
              }];
  
          let label: Array<number> = new Array<number>();
          data.forEach((element, i) => {
              label[i] = i;
          });
          chartOption.chartLabels = label;
  
          chartOption.ChartOptions = {
              responsive: true,
              scales: {
                  xAxes: [
                      {
                          gridLines: {
                              display: false,
                              drawBorder: false
                          },
                          ticks: {
                              display: false
                          },
                          maxBarThickness: 2
                      }
                  ],
                  yAxes: [
                      {
                          gridLines: {
                              display: false,
                              drawBorder: false
                          },
                          ticks: {
                              display: false
                          }
                      }
                  ]
              },
              layout: {
                  padding: {
                      bottom: -10,
                      top: 0,
                      left: 0,
                      right: 0,
                  }
              },
              tooltips: {
                  displayColors: true,
                  callbacks: {
                      // use label callback to return the desired label
                      label: function (tooltipItem, data) {
                          return " " + tooltipItem.yLabel;
                      },
                      // remove title
                      title: function (tooltipItem, data) {
                          return "";
                      }
                  }
              }
          };
          return chartOption;
      }
  
      loadLineAreaChartOptions(data, color, areaColor) {
          let chartOption: EChartOption;
          let xAxisData: Array<any> = new Array<any>();
  
          data.forEach(element => {
              xAxisData.push("");
          });
  
          return chartOption = {
              xAxis: {
                  type: 'category',
                  show: false,
                  data: xAxisData,
                  boundaryGap: false,
              },
              yAxis: {
                  type: 'value',
                  show: false,
                  min: 1
              },
              tooltip: {
                  trigger: 'axis',
                  formatter: function (params, ticket, callback) {
                      return '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:' + color + ';"></span>' + params[0].value;
                  }
              },
              grid: {
                  left: '0%',
                  right: '0%',
                  bottom: '0%',
                  top: '0%',
                  containLabel: false
              },
              series: [{
                  data: data,
                  type: 'line',
                  showSymbol: false,
                  symbolSize: 1,
                  lineStyle: {
                      color: color,
                      width: 1
                  },
                  areaStyle: {
                      color: areaColor
                  }
              }]
          };
      }
  
     
      randomInt(min, max) {
          let rand = Math.floor(Math.random() * (max - min + 1)) + min;
          return rand;
      }
  
      nResized(event: ResizedEvent) {
      }
  
      getMetricValue ( metricResponse  : any) {
  
          let value=null ;
          metricResponse.body.forEach(item => {  
           value = item.param[0] ;   //first  paramater  
          }) ;
         
          return value ;
  
  
      }
  
  
  }