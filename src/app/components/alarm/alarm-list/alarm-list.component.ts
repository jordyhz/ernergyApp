import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { MetricService } from 'src/app/shared/metric.service';
import { Metric } from 'src/app/model/metric';

@Component({
  selector: 'app-alarm-list',
  templateUrl: './alarm-list.component.html',
  styleUrls: ['./alarm-list.component.scss']
})
export class AlarmListComponent implements OnInit {

  
  /* Alarm widgets */
  public alarmWidgetOptions: Array<any> = new Array<any>();

  @Output() onUpdate  = new EventEmitter();
  @Output() onDelete  = new EventEmitter();

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  // displayedColumns = ['id', 'metricName', 'sqlStatement', 'metricDesc', 'update', 'delete'];
  displayedColumns = ['position', 'name', 'weight', 'alarm'];
  dsMetric: MatTableDataSource<any>;
  isLoading  =  true;

   dataTemp = [
    {id:3,column1:"xxxxxx",column2:"yyyyyyyy",column3:"zzzzzzzzzz", date :"2020-01-29" , alarm : "No Alarm"},
    {id:4,column1:"xxxxxx",column2:"yyyyyyyy",column3:"zzzzzzzzzz", date :"2020-01-29" , alarm : "Warning"},
    {id:5,column1:"xxxxxx",column2:"yyyyyyyy",column3:"zzzzzzzzzz", date :"2020-01-29" , alarm : "Minimum"},
    {id:6,column1:"xxxxxx",column2:"yyyyyyyy",column3:"zzzzzzzzzz", date :"2020-01-29" , alarm : "Medium"},
    {id:7,column1:"xxxxxx",column2:"yyyyyyyy",column3:"zzzzzzzzzz", date :"2020-01-29" , alarm : "Critical"}

];

elements: any = [
    {position: 1, name: 'Hydrogen', weight: 1.0079, alarm: 'Critical'},
    {position: 2, name: 'Helium', weight: 4.0026, alarm: 'Warning'},
    {position: 3, name: 'Lithium', weight: 6.941, alarm: 'No Alarm'},
    {position: 4, name: 'Beryllium', weight: 9.0122, alarm: 'Minimum'},
    {position: 5, name: 'Boron', weight: 10.811, alarm: 'Critical'},
    {position: 6, name: 'Carbon', weight: 12.0107, alarm: 'Minimum'},
    {position: 7, name: 'Nitrogen', weight: 14.0067, alarm: 'Critical'},
    {position: 8, name: 'Oxygen', weight: 15.9994, alarm: 'No Alarm'},
    {position: 9, name: 'Fluorine', weight: 18.9984, alarm: 'Critical'},
    {position: 10, name: 'Neon', weight: 20.1797, alarm: 'Medium'},
  ];

  constructor(private toast: ToastrService,
    public dialog: MatDialog, private metricService: MetricService) {

      this.alarmWidgetOptions = [
        {
            type: "facebook",
            title: "Facebook",
            iconStyle: "zmdi zmdi-facebook-box m-r-10",
            post1: {
                iconStyle: "zmdi zmdi-thumb-up col-blue",
                title: "Post View",
                value: "2365"
            },
            post2: {
                iconStyle: "zmdi zmdi-comment-text col-red",
                title: "Comments",
                value: "365"
            },
            data: [
                {
                    "title": "AMERICA",
                    "value": 50
                },
                {
                    "title": "CANADA",
                    "value": 15
                },
                {
                    "title": "ASIA",
                    "value": 35
                }
            ]
        },
        {
            type: "twitter",
            title: "Twitter",
            iconStyle: "zmdi zmdi-twitter-box m-r-10",
            post1: {
                iconStyle: "zmdi zmdi-thumb-up col-blue",
                title: "Likes",
                value: "3159"
            },
            post2: {
                iconStyle: "zmdi zmdi-comment-text col-red",
                title: "Tweets",
                value: "462"
            },
            data: [
                {
                    "title": "AMERICA",
                    "value": 50
                },
                {
                    "title": "CANADA",
                    "value": 15
                },
                {
                    "title": "ASIA",
                    "value": 35
                }
            ]
        },
        {
            type: "youtube",
            title: "YouTube",
            iconStyle: "zmdi zmdi-youtube-play m-r-10",
            post1: {
                iconStyle: "zmdi zmdi-eye col-amber",
                title: "Views",
                value: "15000000"
            },
            post2: {
                iconStyle: "zmdi zmdi-youtube-play col-red",
                title: "Subscribers",
                value: "2000000"
            },
            data: [
                {
                    "title": "AMERICA",
                    "value": 50
                },
                {
                    "title": "CANADA",
                    "value": 15
                },
                {
                    "title": "ASIA",
                    "value": 35
                }
            ]
        },
        {
            type: "instagram",
            title: "Instagram",
            iconStyle: "zmdi zmdi-instagram m-r-10",
            post1: {
                iconStyle: "zmdi zmdi-thumb-up col-white",
                title: "Post Likes",
                value: "9000"
            },
            post2: {
                iconStyle: "zmdi zmdi-comment-text col-red",
                title: "Comments",
                value: "500"
            },
            data: [
                {
                    "title": "AMERICA",
                    "value": 50
                },
                {
                    "title": "CANADA",
                    "value": 75
                },
                {
                    "title": "ASIA",
                    "value": 100
                }
            ]
        },
       
    ];
     }

    ngOnInit() {
    
      this.metricService.getMetrics().subscribe((data:any) => {
        this.dsMetric = new MatTableDataSource(data);
        this.dsMetric.paginator = this.paginator;
        this.dsMetric.sort = this.sort;
        this.isLoading = false;
      } ) ;
 
      setTimeout(() => {
        this.isLoading  =  false;
      }, 2000);
    }


    public applyFilter(filterValue: string) {
      filterValue = filterValue.trim();
      filterValue = filterValue.toLowerCase();
      this.dsMetric.filter = filterValue;
  
  
    }

    changeColor(){
      
    }
  
    // openDialog(): void {
    //   const dialogRef = this.dialog.open(MetricOperationsComponent);
  
    //   dialogRef.afterClosed().subscribe(result => {});
    // }

}
