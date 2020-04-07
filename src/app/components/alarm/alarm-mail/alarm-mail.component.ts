import { Component, OnInit } from '@angular/core';
import { FormGroup , FormControl } from '@angular/forms';

@Component({
  selector: 'app-alarm-mail',
  templateUrl: './alarm-mail.component.html',
  styleUrls: ['./alarm-mail.component.scss']
})
export class AlarmMailComponent implements OnInit {

  inputForm : FormGroup;
  

  constructor() { }

  ngOnInit() {

    this.inputForm = this.createFormGroup();
  }


  createFormGroup() {
    return new FormGroup({
      name: new FormControl(''),
      surname: new FormControl(''),
      title: new FormControl(''),
      email: new FormControl(''),
      status: new FormControl(''),
    });
  }


  editField: string;
    personList: Array<any> = [
      { id: 1, name: 'Aurelia Vega', surname: "Sudi", title: 'Deepends', email: 'xxxxxxx@gmail.com', status: 'true' },
      { id: 2, name: 'Guerra Cortez', surname: "Sudi", title: 'Insectus', email: 'xxxxxxx@gmail.com', status: 'true' },
      { id: 3, name: 'Guadalupe House', surname: "Sudi", title: 'Isotronic', email: 'xxxxxxx@gmail.com', status: 'false' },
      { id: 4, name: 'Aurelia Vega', surname: "Sudi", title: 'Deepends', email: 'xxxxxxx@gmail.com', status: 'true' },
      { id: 5, name: 'Elisa Gallagher', surname: "Sudi", title: 'Portica', email: 'xxxxxxx@gmail.com', status: 'false' },
    ];

    awaitingPersonList: Array<any> = [
      { id: 6, name: 'George Vega', surname: "Sudi", title: 'Classical', email: 'xxxxxxx@gmail.com', status: 'true' },
      { id: 7, name: 'Mike Low', surname: "Sudi", title: 'Lou', email: 'xxxxxxx@gmail.com', status: 'true' },
      { id: 8, name: 'John Derp', surname: "Sudi", title: 'Derping', email: 'xxxxxxx@gmail.com', status: 'false' },
      { id: 9, name: 'Anastasia John', surname: "Sudi", title: 'Ajo', email: 'xxxxxxx@gmail.com', status: 'true' },
      { id: 10, name: 'John Maklowicz', surname: "Sudi", title: 'Mako', email: 'xxxxxxx@gmail.com', status: 'false' },
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
