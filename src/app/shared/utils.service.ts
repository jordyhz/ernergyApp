import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }


  removeDuplicates(dupList : any) {

  let result = [] ;


  //for (let i = 0; i < dupList.length; i++) {

 //   const index = unifiedList.indexOf(dupList[i])
 //   if (index===-1) {
  //    unifiedList.push(dupList[i]) ;  
  //  }

    dupList.forEach(element => {
      const index = result.indexOf(element)
      if (index===-1) {
        result.push(element) ;  
      }
      
    });

    return result ;

   }   


}