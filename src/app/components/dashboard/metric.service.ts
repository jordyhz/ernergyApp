import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MetricService {

 

  public thirdMetricData = new Subject;
 // public serviceUrl = 'http://192.168.1.42:8081/api/metrics/value';
   public serviceUrl = environment.baseUrlMetric + '/metrics/value';


  constructor(private httpClient: HttpClient) { }

  getMetric() {

    this.serviceUrl = environment.baseUrl + '/metrics/value/0';
 
     return this.httpClient.get(this.serviceUrl)
   

   }


   getMetric1001(custId : number ) {
    return this.httpClient.post(this.serviceUrl,
     {
       'metricId':1001,
       'body':[
           {"paramType":"Integer","paramValue": custId},

           ]
       }
     )
  
  }

  getMetric1502(custId : number ) {
    return this.httpClient.post(this.serviceUrl,
     {
       'metricId':1502,
       'body':[
           {"paramType":"Integer","paramValue": custId},

           ]
       }
     )
  
  }

  getMetric1500(custId : number ) {
    console.log(custId);
    console.log(this.serviceUrl);
    return this.httpClient.post(this.serviceUrl,
     {
       'metricId':1500,
       'body':[
           {"paramType":"Integer","paramValue": custId},

           ]
       }
     )
  
  }

  getMetric1501(custId : number ) {
    return this.httpClient.post(this.serviceUrl,
     {
       'metricId':1501,
       'body':[
           {"paramType":"Integer","paramValue": custId},

           ]
       }
     )
  
  }

  getMetric1505(custId : number ) {
    return this.httpClient.post(this.serviceUrl,
     {
       'metricId':1505,
       'body':[
           {"paramType":"Integer","paramValue": custId},

           ]
       }
     )
  
  }

  getMetric1504(custId : number ) {
    return this.httpClient.post(this.serviceUrl,
     {
       'metricId':1504,
       'body':[
           {"paramType":"Integer","paramValue": custId},

           ]
       }
     )
  
  }

  getMetric1503(custId : number ) {
    return this.httpClient.post(this.serviceUrl,
     {
       'metricId':1503,
       'body':[
           {"paramType":"Integer","paramValue": custId},

           ]
       }
     )
  
  }



   getMetric1012(custId : number ) {
     this.httpClient.post(this.serviceUrl,
      {
        'metricId':1012,
        'body':[
            {"paramType":"Integer","paramValue": custId},

            ]
        }
      )
   
   }

   getMetric1014(custId : number ) {
    return this.httpClient.post(this.serviceUrl,
     {
       'metricId':1014,
       'body':[
           {"paramType":"Integer","paramValue": custId},

           ]
       }
     )
  
  }

  getMetric1036(custId : number ) {

   
    return this.httpClient.post(this.serviceUrl,
     {
       'metricId':1036,
       'body':[
           {"paramType":"Integer","paramValue": custId},

           ]
       }
     )
  
  }

  getMetric1030(custId : number ) {

    
  
    return this.httpClient.post(this.serviceUrl,
     {
       'metricId':1030,
       'body':[
           {"paramType":"Integer","paramValue": custId},

           ]
       }
     )
  
  }

  getMetric1037(custId : number ) {

    
  
    return this.httpClient.post(this.serviceUrl,
     {
       'metricId':1037,
       'body':[
           {"paramType":"Integer","paramValue": custId},

           ]
       }
     )
  
  }

  getMetric1038(custId : number ) {

    
  
    return this.httpClient.post(this.serviceUrl,
     {
       'metricId':1038,
       'body':[
           {"paramType":"Integer","paramValue": custId},

           ]
       }
     )
  
  }

  getMetric1033(custId : number ) {

    
  
    return this.httpClient.post(this.serviceUrl,
     {
       'metricId':1033,
       'body':[
           {"paramType":"Integer","paramValue": custId},

           ]
       }
     )
  
  }

  getMetric1040(custId : number ) {

    
  
    return this.httpClient.post(this.serviceUrl,
     {
       'metricId':1040,
       'body':[
           {"paramType":"Integer","paramValue": custId},

           ]
       }
     )
  
  }

  getMetric1032(custId : number ) {

    
  
    return this.httpClient.post(this.serviceUrl,
     {
       'metricId':1032,
       'body':[
           {"paramType":"Integer","paramValue": custId},

           ]
       }
     )
  
  }

  getMetric1039(custId : number ) {

    
  
    return this.httpClient.post(this.serviceUrl,
     {
       'metricId':1039,
       'body':[
           {"paramType":"Integer","paramValue": custId},

           ]
       }
     )
  
  }



  getMetric1031(custId : number ) {

    
  
    return this.httpClient.post(this.serviceUrl,
     {
       'metricId':1031,
       'body':[
           {"paramType":"Integer","paramValue": custId},

           ]
       }
     )
  
  }

  getMetric1034(custId : number ) {

    
  
    return this.httpClient.post(this.serviceUrl,
     {
       'metricId':1034,
       'body':[
           {"paramType":"Integer","paramValue": custId},

           ]
       }
     )
  
  }

  getMetric1041(custId : number ) {

    
  
    return this.httpClient.post(this.serviceUrl,
     {
       'metricId':1041,
       'body':[
           {"paramType":"Integer","paramValue": custId},

           ]
       }
     )
  
  }

  getMetric1042(custId : number ) {

    
  
    return this.httpClient.post(this.serviceUrl,
     {
       'metricId':1042,
       'body':[
           {"paramType":"Integer","paramValue": custId},

           ]
       }
     )
  
  }

  getMetric1043(custId : number ) {

    
  
    return this.httpClient.post(this.serviceUrl,
     {
       'metricId':1043,
       'body':[
           {"paramType":"Integer","paramValue": custId},

           ]
       }
     )
  
  }

  getMetric1044(custId : number ) {

    
  
    return this.httpClient.post(this.serviceUrl,
     {
       'metricId':1044,
       'body':[
           {"paramType":"Integer","paramValue": custId},

           ]
       }
     )
  
  }

  getMetric1045(custId : number ) {

    
  
    return this.httpClient.post(this.serviceUrl,
     {
       'metricId':1045,
       'body':[
           {"paramType":"Integer","paramValue": custId},

           ]
       }
     )
  
  }

  getMetric1046(custId : number ) {

    
  
    return this.httpClient.post(this.serviceUrl,
     {
       'metricId':1046,
       'body':[
           {"paramType":"Integer","paramValue": custId},

           ]
       }
     )
  
  }

  getMetric1011(custId : number ) {

    
  
    return this.httpClient.post(this.serviceUrl,
     {
       'metricId':1011,
       'body':[
           {"paramType":"Integer","paramValue": custId},

           ]
       }
     )
  
  }

  getMetric1006(custId : number ) {

    
  
    return this.httpClient.post(this.serviceUrl,
     {
       'metricId':1006,
       'body':[
           {"paramType":"Integer","paramValue": custId},

           ]
       }
     )
  
  }

  getMetric2001(custId : number ) {

    
  
    return this.httpClient.post(this.serviceUrl,
     {
       'metricId':2001,
       'body':[
           {"paramType":"Integer","paramValue": custId},

           ]
       }
     )
  
  }

  getMetric2002(custId : number ) {

    
  
    return this.httpClient.post(this.serviceUrl,
     {
       'metricId':2002,
       'body':[
           {"paramType":"Integer","paramValue": custId},

           ]
       }
     )
  
  }

  getMetric2003(custId : number ) {

    
  
    return this.httpClient.post(this.serviceUrl,
     {
       'metricId':2003,
       'body':[
           {"paramType":"Integer","paramValue": custId},

           ]
       }
     )
  
  }

  getMetric2004(custId : number ) {

    
  
    return this.httpClient.post(this.serviceUrl,
     {
       'metricId':2004,
       'body':[
           {"paramType":"Integer","paramValue": custId},

           ]
       }
     )
  
  }

  getMetric2005(custId : number ) {

    
  
    return this.httpClient.post(this.serviceUrl,
     {
       'metricId':2005,
       'body':[
           {"paramType":"Integer","paramValue": custId},

           ]
       }
     )
  
  }

  getMetric2006(custId : number ) {

    
  
    return this.httpClient.post(this.serviceUrl,
     {
       'metricId':2006,
       'body':[
           {"paramType":"Integer","paramValue": custId},

           ]
       }
     )
  
  }

  getMetric_1003(custId : number )  {

    return this.httpClient.post(this.serviceUrl,
     {
       'metricId':1003,
       'body':[
           {"paramType":"Integer","paramValue": custId},

           ] 
       }
     )
  }

  getMetric_1007(custId : number )  {

    return this.httpClient.post(this.serviceUrl,
     {
       'metricId':1007,
       'body':[
           {"paramType":"Integer","paramValue": custId},

           ] 
       }
     )
  }
   
 

  getMetric_1011(custId : number )  {

    return this.httpClient.post(this.serviceUrl,
     {
       'metricId':1011,
       'body':[
           {"paramType":"Integer","paramValue": custId},

           ] 
       }
     )
  }
  


   

}