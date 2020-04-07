import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-alarm-widget',
  templateUrl: './alarm-widget.component.html',
  styleUrls: ['./alarm-widget.component.scss']
})
export class AlarmWidgetComponent implements OnInit {


  @Input() options:any = {};

  constructor() { }

  ngOnInit() {
  }

}
