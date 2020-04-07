import { Component, OnInit , Input } from '@angular/core';

@Component({
  selector: 'app-widget-counter-tile',
  templateUrl: './widget-counter-tile.component.html',
  styleUrls: ['./widget-counter-tile.component.scss']
})
export class WidgetCounterTileComponent implements OnInit {

  @Input() options:any = {};
  constructor() { }

  ngOnInit() {
  }

}
