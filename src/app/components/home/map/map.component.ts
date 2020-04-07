import {AfterViewInit, Component, OnInit, ViewChild, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';
import { DataService } from 'src/app/shared/data.service';
import { MouseEvent } from '@agm/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit ,OnInit, OnDestroy {
  
  @ViewChild('gmap', {static: false}) gmapElement: any;
  map: google.maps.Map;
  customerId: number;

  /*  Istanbul Factory*/

  ist_latitude = 41.015137;
  ist_longitude = 28.979530;
  icon = "/assets/img/0007.png";

  /* Izmir Factory */

  izm_latitude = 38.374899;
  izm_longitude =  27.410319;
  icon2 = "/assets/img/0008.png";

  /* Bolu Factory */

  bolu_latitude = 40.506340;
  bolu_longitude = 31.816656;
  icon3 = "/assets/img/0002.png"

  constructor(private router: Router, private data: DataService) { 
  }

  ngOnInit() {
    this.data.currentCustomerId.subscribe(x => this.customerId = x);
    console.log(this.customerId);
  }
  ngOnDestroy() {
    this.data.changeCustomerId(this.customerId) ;
    console.log(this.customerId);
  }



  ngAfterViewInit() {
    //this.data.changeCustomerId(this.customerId) ;
    //console.log(this.customerId);
    const mapProp = {
      center: new google.maps.LatLng(39.333346,  35.502216),
      zoom: 6,
      gestureHandling: 'none',
      zoomControl: false,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    };
    // @ts-ignore

   //this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
   
    /*
    const marker = new google.maps.Marker({position: {lat: 40.8682598, lng: 28.9216813}, icon: '/assets/img/0007.png', map: this.map});
    const marker2 = new google.maps.Marker({position: {lat: 40.506340, lng: 31.816656}, icon: '/assets/img/0002.png', map: this.map});
    const marker3 = new google.maps.Marker({position: {lat: 38.374899, lng: 27.410319}, icon: '/assets/img/0008.png', map: this.map});

  
    marker.setTitle("İstanbul") ;

    marker.setAnimation(google.maps.Animation.BOUNCE);
    marker2.setAnimation(google.maps.Animation.DROP);
    marker2.setTitle("Bolu") ;

    marker3.setAnimation(google.maps.Animation.BOUNCE);
    marker3.setTitle("İzmir") ;



    marker.addListener('click', () => {
      this.customerId = 3 ;
      this.router.navigate(['/details']);
    });
    marker2.addListener('click', () => {
      this.customerId = 4 ;
      this.router.navigate(['/details']);
    });
    marker3.addListener('click', () => {
      this.customerId = 25 ;
      this.router.navigate(['/details']);
    });


    */


  }


  customer27( $event : MouseEvent){
    console.log("Working");
    if (this.customerId === 0 ) {
      this.customerId = 27 ;
    }
      this.router.navigate(['/home/details']);
  }

  customer4( $event : MouseEvent){
    console.log("Working");
    if (this.customerId === 0 ) {
      this.customerId = 27 ;
    }
    this.router.navigate(['/home/main']);
  }

  customer25( $event : MouseEvent){
    console.log("Working");
    if (this.customerId === 0 ) {
      this.customerId = 27 ;
    }
    this.router.navigate(['/home/main']);
  }

}
