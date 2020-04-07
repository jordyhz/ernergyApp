import { Component, OnInit } from '@angular/core';
import { EChartOption,ECharts } from 'echarts';
import * as echarts from 'echarts';

@Component({
  selector: 'app-alarm-report',
  templateUrl: './alarm-report.component.html',
  styleUrls: ['./alarm-report.component.scss']
})
export class AlarmReportComponent implements OnInit {

  public pieOptions: any = {};
  public pieOptions2: any = {};
  public pieOptions3 : any = {};
  public pieOptions4 : any = {};
  public barOptions : any = {};

  constructor() { }

  ngOnInit() {

    this.barOptions = {


    tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    legend: {
        data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: {
        
        type: 'category',
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            name: '直接访问',
            type: 'bar',
            stack: '总量',
            label: {
                show: true,
                position: 'insideRight'
            },
            data: [320, 302, 301, 334, 390, 330, 320]
        },
        {
            name: '邮件营销',
            type: 'bar',
            stack: '总量',
            label: {
                show: true,
                position: 'insideRight'
            },
            data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
            name: '联盟广告',
            type: 'bar',
            stack: '总量',
            label: {
                show: true,
                position: 'insideRight'
            },
            data: [220, 182, 191, 234, 290, 330, 310]
        },
        {
            name: '视频广告',
            type: 'bar',
            stack: '总量',
            label: {
                show: true,
                position: 'insideRight'
            },
            data: [150, 212, 201, 154, 190, 330, 410]
        },
        {
            name: '搜索引擎',
            type: 'bar',
            stack: '总量',
            label: {
                show: true,
                position: 'insideRight'
            },
            data: [820, 832, 901, 934, 1290, 1330, 1320]
        }
    ]
    }

    this.pieOptions = {
      color: ["#88AFFF", "#FFC18D", "#D7A0FF", "#FF8DA3", "#80EBFE"],
      title: {
          text: 'User access source',
          subtext: 'Purely fictitious',
          x: 'center',
          textStyle: {
              color: "#C2C2C2"
          }
      },
      tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
          orient: 'vertical',
          left: 'left',
          data: ['Video ad', 'Email marketing', 'Alliance advertising', 'Direct interview', 'Search engine'],
          textStyle: {
              color: "#C2C2C2"
          }
      },
      series: [
          {
              name: 'Access source',
              type: 'pie',
              radius: '55%',
              center: ['50%', '60%'],
              data: [
                  { value: 135, name: 'Video ad' },
                  { value: 310, name: 'Email marketing' },
                  { value: 234, name: 'Alliance advertising' },
                  { value: 335, name: 'Direct interview' },
                  { value: 1548, name: 'Search engine' }
              ],
              itemStyle: {
                  emphasis: {
                      shadowBlur: 10,
                      shadowOffsetX: 0,
                      shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
              }
          }
      ]
  };

  this.pieOptions4 = {

    title: {
        text: 'Customized Pie',
        left: 'center',
        top: 20,
        textStyle: {
            color: '#ccc'
        }
    },

    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
    },

    visualMap: {
        show: false,
        min: 80,
        max: 600,
        inRange: {
            colorLightness: [0, 1]
        }
    },
    series: [
        {
            name: 'jjjjj',
            type: 'pie',
            radius: '55%',
            center: ['50%', '50%'],
            data: [
                {value: 335, name: 'xxxx'},
                {value: 310, name: 'yyyyy'},
                {value: 274, name: 'oooooo'},
                {value: 235, name: 'iiiii'},
                {value: 400, name: 'llllll'}
            ].sort(function (a, b) { return a.value - b.value; }),
            roseType: 'radius',
            label: {
                color: 'rgba(255, 255, 255, 0.3)'
            },
            labelLine: {
                lineStyle: {
                    color: 'rgba(255, 255, 255, 0.3)'
                },
                smooth: 0.2,
                length: 10,
                length2: 20
            },
            itemStyle: {
                color: '#c23531',
                shadowBlur: 200,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
            },

            animationType: 'scale',
            animationEasing: 'elasticOut',
            animationDelay: function (idx) {
                return Math.random() * 200;
            }
        }
    ]
  }

  this.pieOptions3 = {

    title: {
        text: 'Customized Pie',
        left: 'center',
        top: 20,
        textStyle: {
            color: '#ccc'
        }
    },

    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
    },

    visualMap: {
        show: false,
        min: 80,
        max: 600,
        inRange: {
            colorLightness: [0, 1]
        }
    },
    series: [
        {
            name: 'jjjjj',
            type: 'pie',
            radius: '55%',
            center: ['50%', '50%'],
            data: [
                {value: 335, name: 'xxxx'},
                {value: 310, name: 'yyyyy'},
                {value: 274, name: 'oooooo'},
                {value: 235, name: 'iiiii'},
                {value: 400, name: 'llllll'}
            ].sort(function (a, b) { return a.value - b.value; }),
            roseType: 'radius',
            label: {
                color: 'rgba(255, 255, 255, 0.3)'
            },
            labelLine: {
                lineStyle: {
                    color: 'rgba(255, 255, 255, 0.3)'
                },
                smooth: 0.2,
                length: 10,
                length2: 20
            },
            itemStyle: {
                color: '#c23531',
                shadowBlur: 200,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
            },

            animationType: 'scale',
            animationEasing: 'elasticOut',
            animationDelay: function (idx) {
                return Math.random() * 200;
            }
        }
    ]
  }

  this.pieOptions2 = {
    color: ["#88AFFF", "#FFC18D", "#D7A0FF", "#FF8DA3", "#80EBFE"],
    title: {
        text: 'User access source',
        subtext: 'Purely fictitious',
        x: 'center',
        textStyle: {
            color: "#C2C2C2"
        }
    },
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        left: 'left',
        data: ['Video ad', 'Email marketing', 'Alliance advertising', 'Direct interview', 'Search engine'],
        textStyle: {
            color: "#C2C2C2"
        }
    },
    series: [
        {
            name: 'Access source',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [
                { value: 135, name: 'Video ad' },
                { value: 310, name: 'Email marketing' },
                { value: 234, name: 'Alliance advertising' },
                { value: 335, name: 'Direct interview' },
                { value: 1548, name: 'Search engine' }
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
};
  }

  

}
