import { Component, OnInit } from '@angular/core';
import { EChartOption,ECharts } from 'echarts';
import { MetricService } from '../metric.service.js';
import { DetailTilesComponent } from '../../../components/detail-tiles/detail-tiles.component';

@Component({
  selector: 'app-index2',
  templateUrl: './index2.component.html',
  styleUrls: ['./index2.component.scss']
})
export class Index2Component implements OnInit {

  /*First Gauge */

  public secondTicksColors ;
  metric1006_body : any = {};
  metric1006_value : number = null;
  metric1006_name : string = "";

  /* First Doughut */

  metric1001_value : Number = null;
  metric1001_body : any = {};
  metric1001_name : String = "";

  /*verim */

  verim_name : string = "";
  verim_body_weekly : any;
  verim_body_daily : any;
  verim_body_hourly : any;
  public verim_graph : any = {};
  verim_hours : string [] = [];
  verim_dates : string [] = [];
  verim_data : any [] = [];
  verim_names : string [] = [];
  verim_x_axis : any = {}; 

  /* SET */

  set_name : string = "";
  set_body_weekly : any;
  set_body_daily : any;
  set_body_hourly : any;
  public set_graph : any = {};
  set_hours : string [] = [];
  set_dates : string [] = [];
  set_data : any [] = [];
  set_names : string [] = [];
  set_x_axis : any = {}; 

  /* First Widget */
  public earningsBarChart: EChartOption = {};
  public doghnutChart: any = {};
  public doughnutChartOptions: any = {};


  constructor(private metricService : MetricService) { }

  ngOnInit() {
    /* Gauge */
    
    this.secondTicksColors = "white";
    this.metric1006_Gauge();


    /*DoughnutChart */
    this.getMetric1001();
    /* line graph */

    this.getVerim("hourly");

    setInterval(() =>
    this.getVerim("hourly"),
        
      60000);

    this.getSet("hourly");

    setInterval(() =>
    this.getSet("hourly"),
        
      60000);
  }

  metric1006_Gauge(){
    this.metricService.getMetric1006(25).subscribe((data : any) => {
       
        this.metric1006_body = data.body;
        this.metric1006_name = data.metricName;
        this.metric1006_body.forEach( item => {
            this.metric1006_value = parseInt(item.param[0]);
            console.log(data);  
        })
    });

    
  }

  getMetric1001(){
    this.metricService.getMetric1001(25).subscribe((data : any) => {
       
        this.metric1001_body = data.body;
        this.metric1001_name = data.metricName;
        this.metric1001_body.forEach( item => {
            this.metric1001_value = parseInt(item.param[0]);
              
        });

    

    console.log("qeqweqweqwe"+this.metric1001_value);
    let twentyFive_per;
    
    
    this.doughnutChartOptions = {
        tooltip: {
            trigger: 'item',
            formatter: "{b} : {c} ({d}%)"
        },
        calculable: true,
        series: {
            type: 'pie',
            startAngle: 225,
            
            radius: ['50%', '70%'],
            itemStyle: {
                normal: {
                    label: {
                        show: false
                    },
                    labelLine: {
                        show: false
                    }
                }
            },
            emphasis: {
                label: {
                    show: true,
                    align:'center',
                    verticalAlign: 'center',
                    textStyle: {
                        fontSize: '10',
                        fontWeight: 'bold'
                    }
                }
            },
            data: [
                // { value: 21000, name: 'iOS', itemStyle: { color: "#79C4D6" } },
                // { value: 39000, name: 'Mac', itemStyle:{color:"#459AA8"} },
                { value: this.metric1001_value, name: this.metric1001_name, itemStyle: { color: "#79C268", } },
                { value: 15000, name: 'Windows',itemStyle: {
                  normal: {
                      color: 'rgba(0,0,0,0)',
                      label: { show: false },
                      labelLine: { show: false },
                      tooltip: { show: false }
                  }
                } , }
            ]
        }
    };
    })

    
  }


  getVerim(time_range : String){
      if(time_range === "hourly"){

          this.metricService.getMetric2001(25).subscribe((data : any) => {
            this.verim_body_hourly = data.body;
            this.verim_name = data.metricName;
            this.verimGraph(time_range,this.verim_body_hourly);
        });


          
      }

      else if(time_range === "daily"){
        
        this.metricService.getMetric2002(25).subscribe((data : any) => {
            this.verim_body_daily = data.body;
            this.verim_name = data.metricName;
            this.verimGraph(time_range,this.verim_body_daily);
        });
      
      }

      else if(time_range === "weekly"){

        this.metricService.getMetric2003(25).subscribe((data : any) => {
            this.verim_body_weekly = data.body;
            this.verim_name = data.metricName;
            this.verimGraph(time_range,this.verim_body_weekly);
        });

      }
  }

  verimGraph(time_range, bodyArray : any){

    let series : String [] = [];

    bodyArray.forEach(item => {
        this.verim_names.push(item.param[2]);
    })

    series = this.find_duplicate(this.verim_names);

    this.verim_hours = [];
    this.verim_dates = [];

    bodyArray.forEach(item => {
        if(item.param[2] === series[0]){
            this.verim_hours.push(item.param[0].substring(11,16));
            this.verim_dates.push(item.param[0].substring(0,10));
        }
    })

    for(let i = 0; i < series.length; i++){

        this.verim_data[i] = [];

        bodyArray.forEach(item => {
            if(item.param[2] === series[i]){
                let value = item.param[3];
                let index = value.indexOf(".");
                let str1 = value.slice(index, index + 3);
                let str2 = value.substring(0,index);
                let final_value = str2.concat(str1);

                this.verim_data[i].push(final_value);
            }
        })
      }

      if(time_range === "weekly"){
        this.verim_x_axis = {
            
                type: 'category',
                boundaryGap: false,
                data: this.verim_dates,
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: "#ffffff"
                    }
                },
                axisTick: {
                    show: true
                }
            
        }
    
    }

    else {
        this.verim_x_axis = {
            type: 'category',
            boundaryGap: false,
            data: this.verim_hours,
            axisLine: {
                show: true,
                lineStyle: {
                    color: "#ffffff"
                }
            },
            axisTick: {
                show: true
            },
        }
    }


    this.verim_graph = {
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
        
        calculable: true,
        xAxis: this.verim_x_axis,
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
        
        series: [
            {
                
                name: series[0],
                type: 'line',
                smooth: true,
                color: "#FDCE4E",
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
                data: this.verim_data[0]
            },
            {
                name: series[1],
                type: 'line',
                smooth: true,
                color: "#87F0FF",
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
                data: this.verim_data[1]
            },
            {
                name: series[2],
                type: 'line',
                smooth: true,
                color: "#A17FDE",
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
                data: this.verim_data[2]
            },
            {
                name: series[3],
                type: 'line',
                smooth: true,
                color: "#A17FDE",
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
                data: this.verim_data[3]
            },
            {
                name: series[4],
                type: 'line',
                smooth: true,
                color: "#A17FDE",
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
                data: this.verim_data[4]
            }
        ]
    };
  }

  getSet(time_range : String){
    if(time_range === "hourly"){

        this.metricService.getMetric2004(25).subscribe((data : any) => {
            this.set_body_hourly = data.body;
            this.set_name = data.metricName;
            this.setGraph(time_range,this.set_body_hourly);
        });

    }

    else if(time_range === "daily"){
      
      this.metricService.getMetric2005(25).subscribe((data : any) => {
        this.set_body_daily = data.body;
        this.set_name = data.metricName;
        this.setGraph(time_range,this.set_body_daily);
    });


    }

    else if(time_range === "weekly"){

      this.metricService.getMetric2006(25).subscribe((data : any) => {
        this.set_body_weekly = data.body;
        this.set_name = data.metricName;
        this.setGraph(time_range,this.set_body_weekly);
    });



    }
}


setGraph(time_range , bodyArray : any){

    let series : String [] = [];

    bodyArray.forEach(item => {
        this.set_names.push(item.param[2]);
    })

    series = this.find_duplicate(this.set_names);

    this.set_hours = [];
    this.set_dates = [];

    bodyArray.forEach(item => {
        if(item.param[2] === series[0]){
            this.set_hours.push(item.param[0].substring(11,16));
            this.set_dates.push(item.param[0].substring(0,10));
        }
    })

    for(let i = 0; i < series.length; i++){

        this.set_data[i] = [];

        bodyArray.forEach(item => {
            if(item.param[2] === series[i]){
                let value = item.param[3];
                let index = value.indexOf(".");
                let str1 = value.slice(index, index + 3);
                let str2 = value.substring(0,index);
                let final_value = str2.concat(str1);

                this.set_data[i].push(final_value);
            }
        })
      }

      if(time_range === "weekly"){
        this.set_x_axis = {
            
                type: 'category',
                boundaryGap: false,
                data: this.set_dates,
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: "#ffffff"
                    }
                },
                axisTick: {
                    show: true
                }
            
        }
    
    }

    else {
        this.set_x_axis = {
            type: 'category',
            boundaryGap: false,
            data: this.set_hours,
            axisLine: {
                show: true,
                lineStyle: {
                    color: "#ffffff"
                }
            },
            axisTick: {
                show: true
            },
        }
    }


    this.set_graph = {
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
        
        calculable: true,
        xAxis: this.set_x_axis,
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
        
        series: [
            {
                
                name: series[0],
                type: 'line',
                smooth: true,
                color: "#FDCE4E",
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
                data: this.set_data[0]
            },
            {
                name: series[1],
                type: 'line',
                smooth: true,
                color: "#87F0FF",
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
                data: this.set_data[1]
            },
            {
                name: series[2],
                type: 'line',
                smooth: true,
                color: "#A17FDE",
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
                data: this.set_data[2]
            },
            {
                name: series[3],
                type: 'line',
                smooth: true,
                color: "#A17FDE",
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
                data: this.set_data[3]
            },
            {
                name: series[4],
                type: 'line',
                smooth: true,
                color: "#A17FDE",
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
                data: this.set_data[4]
            }
        ]
    };

}

  

  getDougnutChartOptions() {
    let options: any = {
        title: {
            text: '63',
            x: 'center',
            y: 'center',
            textStyle: {
                color: 'rgb(33, 33, 33)',
                fontFamily: 'Arial',
                fontSize: 20,
                fontWeight: 'bolder'
            }
        },
        tooltip: {
            show: true,
            formatter: function (params, ticket, callback) {
                return '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#212121;"></span>{{this.test}}';
            }
        },
        series: [
            {
                type: 'pie',
                startAngle: 215,
                clockWise: 1,
                radius: [38, 50],
                itemStyle: {
                    normal: {
                        label: { show: false },
                        labelLine: { show: false }
                    }
                },
                data: [
                    {
                        value: 45,
                        itemStyle: {
                            color: '#212121',
                            emphasis: {
                                color: '#212121'
                            }
                        }
                    },
                    {
                        value: 34,
                        itemStyle: {
                            normal: {
                                color: '#EEEEEE',
                                label: { show: false },
                                labelLine: { show: false },
                                tooltip: { show: false }
                            },
                            emphasis: {
                                color: '#EEEEEE'
                            }
                        }
                    },
                    {
                        value: 33,
                        itemStyle: {
                            normal: {
                                color: 'rgba(0,0,0,0)',
                                label: { show: false },
                                labelLine: { show: false },
                                tooltip: { show: false }
                            }
                        }
                    }
                ]
            }
        ]
    }

    return options;
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

}
