import { Component, OnInit } from '@angular/core';
import {CommonService} from '../../shared/common.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor( private common: CommonService) { }

  isAdmin : boolean = false ;
  ngOnInit() {
   
  }

  logOut() {
    this.common.logOut();
  }

}
