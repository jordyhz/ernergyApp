import { Component, OnInit } from '@angular/core';
import { EChartOption, ECharts } from 'echarts';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { ResizedEvent } from 'angular-resize-event';
import { MetricService } from '../../dashboard/metric.service';
import { MetricResponse } from '../../../model/metricresponse';
import { MetricResponseBody } from '../../../model/metricresponsebody';
import { UtilsService } from 'src/app/shared/utils.service';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-index3',
  templateUrl: './index3.component.html',
  styleUrls: ['./index3.component.scss']
})
export class Index3Component implements OnInit {

    interval2 ;
    
    customerId : number = 3 ;
    names : String[] = [] ;
    dates = [] ;
    hours = [] ;
    seconds = [];
    seriesData : any = [] ;
    seriesData0 = [] ;

    /* Güç Tüketim  */

    public powerChart_Option : any = [];
    public powerResponse : MetricResponse;
    powerName : "";

    /*  Frekans */

    public frekansChart_Option : any = [];
    public frekansResponse : MetricResponse ;
    frekansName : "";

    /* Akim definitions */

    public akimChart_Option: any = [] ;
    public akimResponse : MetricResponse  ;
    public respBody : MetricResponseBody[] = [] ;
    akimName: String ="" ;

    /* Voltaj Definitions */

    public voltajChart_Option : any = [];
    public voltajResponse : MetricResponse ;
    voltajName : "";

    series : String [] = [];

      /* Banking */

      public options: Array<any> = new Array<any>();



    /* Receive Data */

    cusMesPoint : any = {};

      public detailTileOptions:Array<any> = new Array<any>();
  
      public metric1003Options: EChartOption = {};
      public metric1007Options: EChartOption = {};
      public metric1011Options: EChartOption = {};
      public metric1500Options: EChartOption = {};
      public metric1501Options: EChartOption = {};
  
      public metric1003DataSeries: Array<number> = [0, 0, 0, 0, 0, 0];
      public metric1007DataSeries: Array<number> = [0, 0, 0, 0, 0, 0];
      public metric1011DataSeries: Array<number> = [0, 0, 0, 0, 0, 0];
      public metric1500DataSeries: Array<number> = [0, 0, 0, 0, 0, 0];
      public metric1501DataSeries: Array<number> = [0, 0, 0, 0, 0, 0];
  
  
      public interval: any = {};
  
      public themeDarkClass: string = "";
      private ngUnsubscribe = new Subject();
  
      public metricResponse : MetricResponse  ;
     // public respBody : MetricResponseBody[] = [] ;
  
      index : number = 1 ;
  
          constructor(private toastr: ToastrService, private metricService: MetricService, private dataService : DataService, private utilService : UtilsService ) 
              { }

              
  
      ngOnInit() {
        

        
        this.interval2 = setInterval(() => {
            this.getPowerValue(),
            this.getfrekansvalue(),
            this.getakimValue(),
            this.getVoltajValue()
              },
              5000);


      





        /*  Banking  */

        this.options = [
          {
              title:'Total Revenue',
              icon:'zmdi zmdi-balance',
              color:'amber',
              unit:'$',
              value: 2078,
              message:'27% lower growth'
          },
          
          {
              title: 'New Employees',
              icon: 'zmdi zmdi-balance',
              color: 'green',
              unit: '',
              value: 78,
              message: '78% lower growth'
          }
      ];

  
          this.metricService.getMetric1500(this.customerId).subscribe( res => {
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
                  options: this.metric1500Options
              }
              this.detailTileOptions.push(tileOption);
  
          } 
          ) ;


          this.metricService.getMetric1501(this.customerId).subscribe( res => {
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
                options: this.metric1501Options
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
              console.log("destroyed") ;
              clearInterval(this.interval);
              //clearInterval(this.interval2);
          }
          
          
          this.ngUnsubscribe.next();
          this.ngUnsubscribe.complete();
      }
  
      chartIntervals() {
          let toggle = true;
          let that = this;
          
          this.interval = setInterval(function () {

            // that.getPowerValue();
            // that.getfrekansvalue();
            // that.getakimValue();
            // that.getVoltajValue();
           
            
             that.metricService.getMetric1500(that.customerId).subscribe( res => {
              let metricResponse =  {
                  metricName : (res as any).metricName,
                  body : (res as any).body
                 };     
                 let metricValue = that.getMetricValue(metricResponse) ;
                 metricValue = parseFloat(metricValue) ;   //  will removed
  
                 that.metric1500DataSeries.shift();
                 that.metric1500DataSeries.push(metricValue);
  
                  that.metric1500Options = that.loadLineAreaChartOptions(that.metric1500DataSeries, "#4aacc5", "#92cddc");
                  that.detailTileOptions[0].value =  metricValue  ;
                  that.detailTileOptions[0].options = that.metric1500Options;

                  console.log("I am 1500"+that.detailTileOptions[0].value);
          } );

          that.metricService.getMetric1501(that.customerId).subscribe( res => {
            let metricResponse =  {
                metricName : (res as any).metricName,
                body : (res as any).body
               };     
               let metricValue = that.getMetricValue(metricResponse) ;
               metricValue = parseFloat(metricValue) ;   //  will removed

               that.metric1501DataSeries.shift();
               that.metric1501DataSeries.push(metricValue);

                that.metric1501Options = that.loadLineAreaChartOptions(that.metric1501DataSeries, "orange", "orange");
                that.detailTileOptions[1].value =  metricValue  ;
                that.detailTileOptions[1].options = that.metric1501Options;

                console.log("I am 1500"+that.detailTileOptions[0].value);
        } );
              
          }, 5000);
          
  
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
                  min: data -(data / 80)
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

      find_duplicate(array) {
        var object = {};
        var result = [];
    
        array.forEach(function (item) {
          if(!object[item])
              object[item] = 0;
            object[item] += 1;
        })
    
        for (var prop in object) {
           if(object[prop] >= 2) {
               result.push(prop);
           }
        }
    
        return result;
    
    }

    fetchResponseData ( metricResponse   : any) {


        this.names = [] ;
        this.dates = [] ;
        this.hours = [] ;
        this.seconds = [];
        this.seriesData = [] ;
    
        let all_names = [] ;
        let all_dates = [] ;
        let all_hours = [] ;
        let all_seconds = [] ;
    
        metricResponse .body.forEach(item => {  
        all_names.push(item.param[2]);   // 2.nci param değerleri names ler fet all names
        all_dates.push(item.param[0]);
        all_hours.push(item.param[0]);
        all_seconds.push(item.param[0]);
           //  0.ncı param değerleri dateler get all dates
    
        }) ;
    
        // console.log("all_names  and all dates:")
        // console.log(all_names) ;
        //console.log(all_dates) ;
    
        let names  = this.utilService.removeDuplicates(all_names) ;
        let dates = this.utilService.removeDuplicates(all_dates) ;
        let hours = this.utilService.removeDuplicates(all_hours);
        let seconds = this.utilService.removeDuplicates(all_hours);
        names.forEach(element => {     // Push data global
            this.names.push(element) ;
        });
        dates.forEach(element => {
            this.dates.push(element.substring(0,10)) ;   
        });
        hours.forEach(element => {
            this.hours.push(element.substring(11,16));
        })
        seconds.forEach(element => {
            this.seconds.push(element.substring(11,19));
        })
        // console.log("uniq names & dates :")
        // console.log(this.names) ;
         console.log(this.dates) ;
         console.log(this.hours)
        // console.log("uniq names & dates 0  :")
        // console.log(this.names[0]) ;
    
    
        let seriesData = this.getSeriesValues(this.names,metricResponse.body)  // Get values 
        seriesData.forEach(element => {
            this.seriesData.push(element) ;
            
        });
        // console.log("series :")
        // console.log(this.seriesData) ;   
    
        for (var i = 0; i < this.seriesData[0].length; i++) {
        this.seriesData0.push(this.seriesData[0][i]);
        } 
        // console.log("series0 :")
        // console.log(this.seriesData0) ;   
    
    
    }
    
    
getSeriesValues ( names, data : any) {   // Get values of each seri i.e devices or tags

    let seriesData : any = []  ;
      var i = 0 ;
      names.forEach(element => {
       seriesData.push([])  ;
        data.forEach(item => {
               if (element === item.param[2]) {
             seriesData[i].push(item.param[3])
               }
           
        });
        i++ ;   
      } ) ;
      return seriesData ;
  }

  getPowerValue(){

    
        this.metricService.getMetric1502(this.customerId).subscribe(res => {
            let powerResponse = {
                metricName : (res as any).metricName,
                body : (res as any).body
            };
    
            this.powerResponse = powerResponse ;
            this.powerName = powerResponse.metricName ;
            this.fetchResponseData(powerResponse) ;
            this.powerChart_Option = this.chart_Metric(this.names, this.seconds,this.seriesData ) ;
    
          //  console.log("Names : " + this.names + "Dates : " + "Series : " + this.seriesData + "Metric name"  );
        })

   

  }

  getVoltajValue(){

   
      
        this.metricService.getMetric1504(this.customerId).subscribe(res => {
            let voltajResponse = {
                metricName : (res as any).metricName,
                body : (res as any).body
            };
    
            this.voltajResponse = voltajResponse ;
            this.voltajName = voltajResponse.metricName ;
            this.fetchResponseData(voltajResponse) ;
            this.voltajChart_Option = this.chart_Metric(this.names, this.seconds,this.seriesData ) ;
    
           // console.log("Names : " + this.names + "Dates : " + "Series : " + this.seriesData + "Metric name"  );
        })
   
  
    }

  getfrekansvalue(){

    
          
        this.metricService.getMetric1505(this.customerId).subscribe(res => {
            let frekansResponse = {
                metricName : (res as any).metricName,
                body : (res as any).body
            };
    
            this.frekansResponse = frekansResponse ;
            this.frekansName = frekansResponse.metricName ;
            this.fetchResponseData(frekansResponse) ;
            this.frekansChart_Option = this.chart_Metric(this.names, this.seconds,this.seriesData ) ;
    
           // console.log("Names : " + this.names + "Dates : " + "Series : " + this.seriesData + "Metric name"  );
        })
   
  

  }

  getakimValue(){


    
        
      this.metricService.getMetric1503(this.customerId).subscribe(res => {
          let akimResponse = {
              metricName : (res as any).metricName,
              body : (res as any).body
          };
  
          this.akimResponse = akimResponse ;
          this.akimName = akimResponse.metricName ;
          this.fetchResponseData(akimResponse) ;
          this.akimChart_Option = this.chart_Metric(this.names, this.dates,this.seriesData ) ;
  
         // console.log("Names : " + this.names + "Dates : " + "Series : " + this.seriesData + "Metric name"  );
      })
 

    }

  chart_Metric (names,dates, seriesData : any )  { 

    let chartOption: any = [] ;

    let colorOpt = [] ;
    
    colorOpt.push("#87F0FF");
    colorOpt.push("#A17FDE");
    colorOpt.push("#FDCE4E");




    let chartSeriesData : any = [] ;
    let i = 0 ;
    seriesData.forEach(element => {
        let seriesItem =  {
            name: names[i],
            type: 'line',
            //areaStyle: {},
            smooth: true,
           // color: "#FDC10A",
            color: colorOpt[i],
            itemStyle: {
                normal: {
                    areaStyle: {
                        type: 'default',
                        opacity: 0.3
                    }
                }
            },
            lineStyle: {
                width: 2
            },
            data: element 
        }
        chartSeriesData.push(seriesItem) ;
        i++ ;
        
    });

    chartOption = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            }
        },
        legend: {
            date:[],
            textStyle:{
                color: "#ffffff"
            }
        },
        grid: {
            left: "10%",
            top: "10%",
            right: "10%",
            bottom: "10%"
        },
        responsive:true,
        calculable: true,
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: dates,
           // data: ['Ocak', 'Şubat', 'Mart', 'Nisan', 'MMayıs', 'Haziran', 'Temmuzz'],
            axisLine: {
                show: true,
                lineStyle: {
                    color: "#ffffff"
                }
            },
            axisTick: {
                show: false
            }
        },
        yAxis: {
            type: 'value',

            axisLine: {
                show: true,
                lineStyle: {
                    color: "#ffffff"
                }
            },
            axisTick: {
                show: true
            },
            splitLine: {
                show:false,
                lineStyle: {
                    color: "#ffffff"
                }
            }
        },
        series: chartSeriesData     // Put built series data
    };
    /** chart end* */

    return chartOption ;
   
  }


  

}
