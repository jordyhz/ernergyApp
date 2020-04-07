import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Customer} from '../model/customer';
import {Subject} from 'rxjs';
import {CustomerAddress} from '../model/customerAddress';
import {CustomerEquipment} from '../model/customerEquipment';
import {CustomerMeasurementPoint} from '../model/customerMeasurementPoint';
import { CusMeasurementPoint } from '../model/cusMeasurementPoint';


@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  baseUrl = environment.baseUrl + '/customers';
  public customers = new Subject;
  public addressList = new Subject;
  public equipmentList = new Subject;
  public measurementList = new Subject;
  constructor(private http: HttpClient) { }

  getCustomers() {
    this.http.get(this.baseUrl).subscribe((res: any) => {
      this.customers.next();
      this.customers.next(res.responseBody);
    });
  }

  getAddresses(customerId: number) {
    this.http.get(this.baseUrl + '/' + customerId + '/address').subscribe((res: any) => {
      this.addressList.next();
      this.addressList.next(res.responseBody);
    });
  }


  addCustomer(customer: Customer) {
    return this.http.post(this.baseUrl + '/add',
      {
        'cusCode': customer.cusCode,
        'cusName': customer.cusName,
        'cusLevel': customer.cusLevel,
        'active': customer.active,
        'sectorId': customer.sector.id,
        'parentId': customer.parent.id
      });
  }

  deleteCustomer(id: number) {
    return this.http.delete(this.baseUrl + '/delete/' + id);
  }

  updateCustomer(customer: Customer) {
    return this.http.put(this.baseUrl + '/update/' + customer.id,
      {
        'cusName': customer.cusName,
        'cusLevel': customer.cusLevel,
        'active': customer.active,
        'sectorId': customer.sector.id,
        'parentId': customer.parent.id
      });
  }

  getChildren(customerId: number) {
    return this.http.get(this.baseUrl + '/' + customerId + '/children');
  }


  deleteAddress(id: number) {
    return this.http.delete(this.baseUrl + '/delete/' + id);
  }

  addAddress(address: CustomerAddress) {
    return this.http.post(this.baseUrl + '/add',
      {
        'customer': address.customer,
        'addressType': address.addressType,
        'addressLine': address.addressLine,
        'phone1': address.phone1,
        'phone2': address.phone2,
        'zipCode': address.zipCode,
        'city': address.city,
        'country': address.country
      });
  }

  updateAddress(address: CustomerAddress) {
    return this.http.put(this.baseUrl  + '/update/' + address.id,
      {
        'addressType': address.addressType,
        'addressLine': address.addressLine,
        'phone1': address.phone1,
        'phone2': address.phone2,
        'zipCode': address.zipCode,
        'city': address.city,
        'country': address.country
      });
  }

  getEquipments(customerId: number) {
    this.http.get(this.baseUrl + '/' + customerId + '/equipments').subscribe((res: any) => {
      this.equipmentList.next();
      this.equipmentList.next(res.responseBody);
    });
  }

  
  deleteEquipment(id: number) {
    return this.http.delete(this.baseUrl + '/equipments/delete/' + id);
  }

  deleteMeasurementPoint(id : number){

    return this.http.delete(this.baseUrl + '/mespoints/delete/' + id)

  }



  updateEquipment(customerEquipment: CustomerEquipment) {
    return this.http.put(this.baseUrl  + '/equipments/update/' + customerEquipment.id,
      {
        'customer': customerEquipment.customer,
        'name': customerEquipment.name,
        'serialNumber': customerEquipment.serialNumber,
        'equipment': customerEquipment.equipment
      });
  }

  addEqiupment(customerEquipment: CustomerEquipment) {
    return this.http.post(this.baseUrl + '/equipments/add',
      {
        'customer': customerEquipment.customer,
        'name': customerEquipment.name,
        'serialNumber': customerEquipment.serialNumber,
        'equipment': customerEquipment.equipment
      });
  }
  
  getMeasurements(customerId: number) {
    this.http.get(this.baseUrl + '/' + customerId + '/mespoints').subscribe((res: any) => {
      this.measurementList.next();
      this.measurementList.next(res.responseBody);
    });
  }

  addMeasurementPoint(customerMeasurementPoint : CusMeasurementPoint){

    return this.http.post(this.baseUrl  + '/mespoints/add',{
      'customer' : customerMeasurementPoint.customer,
      'name' : customerMeasurementPoint.name,
      'measurementPoint' : customerMeasurementPoint.measurementPoint,
      'customerEquipment' : customerMeasurementPoint.customerEquipment,
      'des': customerMeasurementPoint.desc,
        

    })

  }

  updateMeasurementPoint(customerMeasurementPoint: CusMeasurementPoint) {
    return this.http.put(this.baseUrl  + '/mespoints/update/' + customerMeasurementPoint.id,
    {
      'customer' : customerMeasurementPoint.customer,
      'name' : customerMeasurementPoint.name,
      'customerEquipment' : customerMeasurementPoint.customerEquipment,
      'des': customerMeasurementPoint.desc,
        

    } );
  }
}
