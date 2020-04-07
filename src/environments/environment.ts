// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
export const environment = {
  production: false,
  //baseUrl: 'http://localhost:8080/api',
 // baseUrl: 'http://localhost:9090/api',

  //baseUrl : 'http://ec2-3-125-73-121.eu-central-1.compute.amazonaws.com:8080/api',

  baseUrl : 'http://176.88.250.65:7070/api',
  // baseUrl : 'http://192.168.1.66:8080/api',
  //baseUrl : 'http://192.168.1.42:8080/api',
  // baseUrl : 'http://192.168.1.42:9090/api',

  //   baseUrl : 'http://ec2-3-125-73-121.eu-central-1.compute.amazonaws.com:8080/api',


  //baseUrlMetric: 'http://localhost:8081/api',
  //baseUrlMetric: 'http://localhost:8081/api',
  baseUrlMetric : 'http://176.88.250.65:9091/api',
  //baseUrlMetric : 'http://176.88.250.65:9091/api',
  //baseUrlMetric : 'http://192.168.1.42:8081/api', 
  //baseUrlMetric : 'http://192.168.1.42:9091/api',
  
  region: 'eu-central-1',
  userPoolId: 'eu-central-1_WMiIOpLb7',
  userPoolWebClientId: 'ivsllqg7e8pf2q76gpgo2evif'
};


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
