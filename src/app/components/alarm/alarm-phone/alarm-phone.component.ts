import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alarm-phone',
  templateUrl: './alarm-phone.component.html',
  styleUrls: ['./alarm-phone.component.scss']
})
export class AlarmPhoneComponent implements OnInit {

   constructor() { }

  ngOnInit() {
  }

  editField: string;
    personList: Array<any> = [
      { id: 1, name: 'Aurelia Vega', surname: "Sudi", title: 'Deepends', phoneNumber: '555-8888', status: 'true' },
      { id: 2, name: 'Guerra Cortez', surname: "Sudi", title: 'Insectus', phoneNumber: '555-8888', status: 'true' },
      { id: 3, name: 'Guadalupe House', surname: "Sudi", title: 'Isotronic', phoneNumber: '555-8888', status: 'false' },
      { id: 4, name: 'Aurelia Vega', surname: "Sudi", title: 'Deepends', phoneNumber: '555-8888', status: 'true' },
      { id: 5, name: 'Elisa Gallagher', surname: "Sudi", title: 'Portica', phoneNumber: '555-8888', status: 'false' },
    ];

    awaitingPersonList: Array<any> = [
      { id: 6, name: 'George Vega', surname: "Sudi", title: 'Classical', phoneNumber: '555-8888', status: 'true' },
      { id: 7, name: 'Mike Low', surname: "Sudi", title: 'Lou', phoneNumber: '555-8888', status: 'true' },
      { id: 8, name: 'John Derp', surname: "Sudi", title: 'Derping', phoneNumber: '555-8888', status: 'false' },
      { id: 9, name: 'Anastasia John', surname: "Sudi", title: 'Ajo', phoneNumber: '555-8888', status: 'true' },
      { id: 10, name: 'John Maklowicz', surname: "Sudi", title: 'Mako', phoneNumber: '555-8888', status: 'false' },
    ];

    updateList(id: number, property: string, event: any) {
      const editField = event.target.textContent;
      this.personList[id][property] = editField;
    }

    remove(id: any) {
      this.awaitingPersonList.push(this.personList[id]);
      this.personList.splice(id, 1);
    }

    add() {
      if (this.awaitingPersonList.length > 0) {
        const person = this.awaitingPersonList[0];
        this.personList.push(person);
        this.awaitingPersonList.splice(0, 1);
      }
    }

    changeValue(id: number, property: string, event: any) {
      this.editField = event.target.textContent;
    }

 

}
