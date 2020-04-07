import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-energy-cards',
  templateUrl: './energy-cards.component.html',
  styleUrls: ['./energy-cards.component.scss']
})
export class EnergyCardsComponent implements OnInit {

  @Input() options:any = {};

  constructor() { }

  ngOnInit() {
  }

}
