import { Component, OnInit } from '@angular/core';
import { EChartOption,ECharts } from 'echarts';
import { MetricService } from '../metric.service.js';
import { parse } from 'querystring';
import { MatHeaderRow } from '@angular/material';
import {UtilsService} from '../../../shared/utils.service';
import { MetricResponse } from 'src/app/model/metricresponse.js';
import { MetricResponseBody } from '../../../model/metricresponsebody';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

    interval ;
    customerId : number = 3 ;
    names : String[] = [] ;
    dates = [] ;
    hours = [] ;
    seriesData : any = [] ;
    seriesData0 = [] ;

    

    /* Akim definitions */

    public akimChart_Option: any = [] ;
    public akimResponse : MetricResponse  ;
    public respBody : MetricResponseBody[] = [] ;
    akimName: String ="" ;

    /* Voltage definitions */

    public voltajChart_Option : any = [];
    public voltajResponse : MetricResponse ;
    voltajName : "";

    /* Frekans definitions **/

    public frekansChart_Option : any = [];
    public frekansResponse : MetricResponse ;
    frekansName : "";

    /* Power definitions */

    public powerChart_Option : any = [];
    public powerResponse : MetricResponse;
    powerName : "";

    /* Powers definitions */

    public powersChart_Option : any [];
    public powersResponse : MetricResponse;
    powersName : "";



  metricName : string = "";
  firstGauge_metricname : string = "";
  secondGauge_metricname : string = "";
  secondGauge_value : Number = null;
  firstGauge_value : Number = null;


  
  cp : any;
  cp2 : any;
  public earningChartOption: any = {};

  
  public ticksColors = "green" ;
  public secondTicksColors  = "white";
  

  constructor(private metricService : MetricService , private utilService: UtilsService) { }

  ngOnInit() {


    this.getVoltajValue("hourly");
    this.getakimValue("hourly");
    this.getfrekansvalue("hourly");
    this.getPowerValue("hourly");
    this.getPowersValue("hourly");
    this.second_Gauge();
    this.first_Gauge();


    this.interval = setInterval(() => {
    this.getVoltajValue("hourly"),
    this.getakimValue("hourly"),
    this.getfrekansvalue("hourly"),
    this.getPowerValue("hourly"),
    this.getPowersValue("hourly"),
    this.second_Gauge(),
    this.first_Gauge()

      },
      60000);
    
  }

  ngOnDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }


    

  getPowerValue(time_range : string){

    if(time_range === "daily"){
        this.metricService.getMetric1039(this.customerId).subscribe(res => {
            let powerResponse = {
                metricName : (res as any).metricName,
                body : (res as any).body
            };
    
            this.powerResponse = powerResponse ;
            this.powerName = powerResponse.metricName ;
            this.fetchResponseData(powerResponse) ;
            this.powerChart_Option = this.chart_Metric(this.names, this.dates,this.seriesData ) ;
    
          //  console.log("Names : " + this.names + "Dates : " + "Series : " + this.seriesData + "Metric name"  );
        })

    }

    else if (time_range === "hourly"){
        this.metricService.getMetric1032(this.customerId).subscribe(res => {
            let powerResponse = {
                metricName : (res as any).metricName,
                body : (res as any).body
            };
    
            this.powerResponse = powerResponse ;
            this.powerName = powerResponse.metricName ;
            this.fetchResponseData(powerResponse) ;
            this.powerChart_Option = this.chart_Metric(this.names, this.dates,this.seriesData ) ;
    
          //  console.log("Names : " + this.names + "Dates : " + "Series : " + this.seriesData + "Metric name"  );
        })
    }

    else if (time_range === "weekly"){

        this.metricService.getMetric1044(this.customerId).subscribe(res => {
            let powerResponse = {
                metricName : (res as any).metricName,
                body : (res as any).body
            };
    
            this.powerResponse = powerResponse ;
            this.powerName = powerResponse.metricName ;
            this.fetchResponseData(powerResponse) ;
            this.powerChart_Option = this.chart_Metric(this.names, this.dates,this.seriesData ) ;
    
          //  console.log("Names : " + this.names + "Dates : " + "Series : " + this.seriesData + "Metric name"  );
        })

    }
    

  }

  getPowersValue(time_range : string){

    if(time_range === "daily"){
        this.metricService.getMetric1041(this.customerId).subscribe(res => {
            let powersResponse = {
                metricName : (res as any).metricName,
                body : (res as any).body
            };
    
            this.powersResponse = powersResponse ;
            this.powersName = powersResponse.metricName ;
            this.fetchResponseData(powersResponse) ;
            this.powersChart_Option = this.chart_Metric(this.names, this.dates,this.seriesData ) ;
    
          //  console.log("Names : " + this.names + "Dates : " + "Series : " + this.seriesData + "Metric name"  );
        })

    }

    else if (time_range === "hourly"){

        this.metricService.getMetric1034(this.customerId).subscribe(res => {
            let powersResponse = {
                metricName : (res as any).metricName,
                body : (res as any).body
            };
    
            this.powersResponse = powersResponse ;
            this.powersName = powersResponse.metricName ;
            this.fetchResponseData(powersResponse) ;
            this.powersChart_Option = this.chart_Metric(this.names, this.dates,this.seriesData ) ;
    
           // console.log("Names : " + this.names + "Dates : " + "Series : " + this.seriesData + "Metric name"  );
        })
    }

    else if (time_range === "weekly"){
        this.metricService.getMetric1046(this.customerId).subscribe(res => {
            let powersResponse = {
                metricName : (res as any).metricName,
                body : (res as any).body
            };
    
            this.powersResponse = powersResponse ;
            this.powersName = powersResponse.metricName ;
            this.fetchResponseData(powersResponse) ;
            this.powersChart_Option = this.chart_Metric(this.names, this.dates,this.seriesData ) ;
    
           // console.log("Names : " + this.names + "Dates : " + "Series : " + this.seriesData + "Metric name"  );
        })
    }
      
  }

    getVoltajValue(time_range : string){

        if(time_range === "daily"){
          
            this.metricService.getMetric1037(this.customerId).subscribe(res => {
                let voltajResponse = {
                    metricName : (res as any).metricName,
                    body : (res as any).body
                };
        
                this.voltajResponse = voltajResponse ;
                this.voltajName = voltajResponse.metricName ;
                this.fetchResponseData(voltajResponse) ;
                this.voltajChart_Option = this.chart_Metric(this.names, this.hours,this.seriesData ) ;
        
               // console.log("Names : " + this.names + "Dates : " + "Series : " + this.seriesData + "Metric name"  );
            })
       
      
          }

          else if(time_range === "hourly"){
            
            this.metricService.getMetric1030(this.customerId).subscribe(res => {
                let voltajResponse = {
                    metricName : (res as any).metricName,
                    body : (res as any).body
                };
        
                this.voltajResponse = voltajResponse ;
                this.voltajName = voltajResponse.metricName ;
                this.fetchResponseData(voltajResponse) ;
                this.voltajChart_Option = this.chart_Metric(this.names, this.hours,this.seriesData ) ;
        
               // console.log("Names : " + this.names + "Dates : " + "Series : " + this.seriesData + "Metric name"  );
            })

          }

          else if(time_range === "weekly"){
            this.metricService.getMetric1042(this.customerId).subscribe(res => {
                let voltajResponse = {
                    metricName : (res as any).metricName,
                    body : (res as any).body
                };
        
                this.voltajResponse = voltajResponse ;
                this.voltajName = voltajResponse.metricName ;
                this.fetchResponseData(voltajResponse) ;
                this.voltajChart_Option = this.chart_Metric(this.names, this.dates,this.seriesData ) ;
        
               // console.log("Names : " + this.names + "Dates : " + "Series : " + this.seriesData + "Metric name"  );
            })
          }

    }

    getakimValue(time_range : String){


      if(time_range === "daily"){
          
        this.metricService.getMetric1038(this.customerId).subscribe(res => {
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
  
      else if(time_range === "hourly"){
          
        this.metricService.getMetric1031(this.customerId).subscribe(res => {
            let akimResponse = {
                metricName : (res as any).metricName,
                body : (res as any).body
            };
    
            this.akimResponse = akimResponse ;
            this.akimName = akimResponse.metricName ;
            this.fetchResponseData(akimResponse) ;
            this.akimChart_Option = this.chart_Metric(this.names, this.dates,this.seriesData ) ;
    
          //  console.log("Names : " + this.names + "Dates : " + "Series : " + this.seriesData +this.akimName );
        })
  
      }
  
      else if(time_range === "weekly"){
        
        this.metricService.getMetric1043(this.customerId).subscribe(res => {
            let akimResponse = {
                metricName : (res as any).metricName,
                body : (res as any).body
            };
    
            this.akimResponse = akimResponse ;
            this.akimName = akimResponse.metricName ;
            this.fetchResponseData(akimResponse) ;
            this.akimChart_Option = this.chart_Metric(this.names, this.dates,this.seriesData ) ;
    
          //  console.log("Names : " + this.names + "Dates : " + "Series : " + this.seriesData );
        })
  
      }
      
  
  }


  getfrekansvalue(time_range : string){

    if(time_range === "daily"){
          
        this.metricService.getMetric1040(this.customerId).subscribe(res => {
            let frekansResponse = {
                metricName : (res as any).metricName,
                body : (res as any).body
            };
    
            this.frekansResponse = frekansResponse ;
            this.frekansName = frekansResponse.metricName ;
            this.fetchResponseData(frekansResponse) ;
            this.frekansChart_Option = this.chart_Metric(this.names, this.dates,this.seriesData ) ;
    
           // console.log("Names : " + this.names + "Dates : " + "Series : " + this.seriesData + "Metric name"  );
        })
   
  
      }
  
      else if(time_range === "hourly"){
          
        this.metricService.getMetric1033(this.customerId).subscribe(res => {
            let frekansResponse = {
                metricName : (res as any).metricName,
                body : (res as any).body
            };
    
            this.frekansResponse = frekansResponse ;
            this.frekansName = frekansResponse.metricName ;
            this.fetchResponseData(frekansResponse) ;
            this.frekansChart_Option = this.chart_Metric(this.names, this.dates,this.seriesData ) ;
    
           // console.log("Names : " + this.names + "Dates : " + "Series : " + this.seriesData + "Metric name"  );
        })
  
      }
  
      else if(time_range === "weekly"){
        
        this.metricService.getMetric1045(this.customerId).subscribe(res => {
            let frekansResponse = {
                metricName : (res as any).metricName,
                body : (res as any).body
            };
    
            this.frekansResponse = frekansResponse ;
            this.frekansName = frekansResponse.metricName ;
            this.fetchResponseData(frekansResponse) ;
            this.frekansChart_Option = this.chart_Metric(this.names, this.dates,this.seriesData ) ;
    
           // console.log("Names : " + this.names + "Dates : " + "Series : " + this.seriesData + "Metric name"  );
        })
  
      }

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

  

  first_Gauge(){
    this.metricService.getMetric1036(this.customerId).subscribe((data : any) => {
       
        this.cp = data.body;
        this.firstGauge_metricname = data.metricName;
        
        

        this.cp.forEach( item => {
            this.firstGauge_value = parseInt(item.param[0]);
            
        })
        

    });

    

}

second_Gauge(){
  this.metricService.getMetric1011(25);

  this.metricService.thirdMetricData.subscribe((data : any) => {
     
      this.cp2 = data.body;
      this.secondGauge_metricname = data.metricName;
      
    //   console.log(this.secondGauge_metricname);
    //   console.log(this.cp2);

      this.cp2.forEach( item => {
          this.secondGauge_value = parseInt(item.param[0]);
        //   console.log(item.param[0]);
        //   console.log(this.secondGauge_value);
      })
      

  })

  

}


fetchResponseData ( metricResponse   : any) {


    this.names = [] ;
    this.dates = [] ;
    this.hours = [] ;
    this.seriesData = [] ;

    let all_names = [] ;
    let all_dates = [] ;
    let all_hours = [] ;

    metricResponse .body.forEach(item => {  
    all_names.push(item.param[2]);   // 2.nci param değerleri names ler fet all names
    all_dates.push(item.param[0]);
    all_hours.push(item.param[0]);    //  0.ncı param değerleri dateler get all dates

    }) ;

    // console.log("all_names  and all dates:")
    // console.log(all_names) ;
    //console.log(all_dates) ;

    let names  = this.utilService.removeDuplicates(all_names) ;
    let dates = this.utilService.removeDuplicates(all_dates) ;
    let hours = this.utilService.removeDuplicates(all_hours);
    names.forEach(element => {     // Push data global
        this.names.push(element) ;
    });
    dates.forEach(element => {
        this.dates.push(element.substring(0,10)) ;   
    });
    hours.forEach(element => {
        this.hours.push(element.substring(11,16));
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
