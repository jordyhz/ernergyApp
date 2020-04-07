import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/shared/home.service';
import { DataService } from 'src/app/shared/data.service';
import { EquipmentSystem } from 'src/app/model/equipmentSystem';
import { MeasurementPoint } from 'src/app/model/measurementPoint';
import { CustomerMeasurementPoint } from 'src/app/model/customerMeasurementPoint';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homemain',
  templateUrl: './homemain.component.html',
  styleUrls: ['./homemain.component.scss']
})
export class HomemainComponent implements OnInit {

 
  constructor(private homeService: HomeService, private dataService: DataService, private router: Router) {

  }

  equipmentSystems: EquipmentSystem[] = [] ;
  measurementPoints: MeasurementPoint[] = [];
  cusMesPoints: CustomerMeasurementPoint[] = [];
  customerId: number;

  expandOption :boolean = true ;
  interval ;

    image1 = "assets/img/air-conditioner-grey.png";
    image2= "assets/img/fridge-grey.png";
    image3= "assets/img/washing-machine-grey.png";

    lgColumn = "col-lg-6" ;



  ngOnInit() {

    // diğer componennt gelen customerid yi al.
    this.dataService.currentCustomerId.subscribe(x => this.customerId = x) ;
    console.log("Home Component.Customer Id:") ;
    console.log(this.customerId) ;
    if (this.customerId ===0 ) {
      console.log("Routing to map:") ;
      this.router.navigate(['/home']);
      return ;

    }
    
    this.homeService.getMesPoints(this.customerId).subscribe((response: any) => {
      response.responseBody.forEach(item => {
        const index = this.measurementPoints.findIndex(x => x.id === item.measurementPoint.id);

        this.cusMesPoints.push({id: item.id, name: item.name, mesPointId: item.measurementPoint.id, transaction: []});
        if (index === -1) {
          this.measurementPoints.push({id: item.measurementPoint.id, name: item.measurementPoint.name,
            desc: item.measurementPoint.desc, equipment: item.measurementPoint.equipment,
            level: item.measurementPoint.level, cusMesPoint: []});

            //  Equipment systems : build Uniqe equipmentSystems 
            const index2 = this.equipmentSystems.findIndex(x => x.id === item.measurementPoint.equipment.id);
            if (index2 === -1 ) {
              this.equipmentSystems.push({id:item.measurementPoint.equipment.id , name: item.measurementPoint.equipment.name,desc:item.measurementPoint.equipment.desc,mesPoint:[]});
             
            }

        }
      });

      this.cusMesPoints.forEach(item => {
        const index = this.measurementPoints.findIndex(x => x.id === item.mesPointId);
        this.measurementPoints[index].cusMesPoint.push(item);
      });
      
      // fill related mesPoints to equipmentSystems
      this.equipmentSystems.forEach(item => {
          this.measurementPoints.forEach( element => {
            if ( item.id === element.equipment.id ) {
                item.mesPoint.push(element) ;
            }    
          }) ;
      }) ;
    console.log("equipmentSystems: ") ;
    console.log(this.equipmentSystems ) ;
  
    this.getTransactionAll(this.customerId);

    /*
    this.interval = setInterval(() =>
          this.getTransactionAll(this.customerId),
        10000);

    */    
    });

  }

  ngOnDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  getTransactionAll(customerId: number) {

      this.homeService.getTransactions(customerId).subscribe((response: any) => {
        response.responseBody.forEach(element => {
          const index = this.cusMesPoints.findIndex(x => x.id === element.customerTag.customerMeasurementPoint.id);
          this.cusMesPoints[index].transaction = [];
        });
        response.responseBody.forEach(element => {
          const index = this.cusMesPoints.findIndex(x => x.id === element.customerTag.customerMeasurementPoint.id);
          this.cusMesPoints[index].transaction.push({
            cusMesPointId: element.id, tag_unit: element.customerTag.attribute.unit,
            tag_value: element.tagValue, tag_name: element.customerTag.attribute.name,
            tag_isprior:element.customerTag.prior
          });
        });
      });
  }


}
