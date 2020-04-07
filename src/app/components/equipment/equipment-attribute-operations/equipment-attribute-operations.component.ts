import { Component, Inject, OnInit, AfterViewInit } from '@angular/core';
import {AttributeService} from '../../../shared/attribute.service';
import {Attribute} from '../../../model/attribute';
import {MeasurementPointListComponent} from '../../measurement-point/measurement-point-list/measurement-point-list.component';
import {MatDialogRef} from '@angular/material/dialog';
import {EquipmentService} from '../../../shared/equipment.service';
import {MAT_DIALOG_DATA} from '@angular/material';
import {ToastrService} from 'ngx-toastr';
import { MatListOption } from '@angular/material/list';
@Component({
  selector: 'app-equipment-attribute-operations',
  templateUrl: './equipment-attribute-operations.component.html',
  styleUrls: ['./equipment-attribute-operations.component.scss']
})
export class EquipmentAttributeOperationsComponent implements OnInit, AfterViewInit {
  attributes: Attribute[];
  isLoading: boolean;
  selectedOptions: MatListOption[];
  constructor(private attributeService: AttributeService, private equipmentService: EquipmentService, private toast: ToastrService,
              @Inject(MAT_DIALOG_DATA) public equipmentData, public dialogRef: MatDialogRef< MeasurementPointListComponent>) {}

  ngOnInit() {
    this.isLoading = true;
    this.attributeService.getAttributes();
    this.attributeService.attributes.subscribe((data: any) => {
      this.attributes = data;
      this.isLoading = false;
    });
  }

  ngAfterViewInit() {
    this.equipmentService.getActiveAttributesEquipment(this.equipmentData.id).subscribe((elements: any) => {
      elements.responseBody.forEach(element => {
        const index = this.attributes.findIndex(num => num.id === element.id);
        this.attributes[index].selected = true;
      });
    });
    setTimeout(() => {
      this.isLoading  =  false;
    }, 5000);
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

  saveAttribute(): void {
      this.equipmentService.makeAttributesInactive(this.equipmentData.id).subscribe(
        next => {
          if (this.selectedOptions) {
          this.selectedOptions.forEach(option => {
            const attribute = {} as Attribute;
            attribute.id = option.value.id;
            this.equipmentService.addAttributesEquipment(this.equipmentData, attribute).subscribe();
          });
        }
          this.toast.success('Başarıyla Kaydedildi!', 'Kayıt İşlemi');
        }
      );
  }

  onGroupsChange(options: MatListOption[]) {
    this.selectedOptions = options;
  }

}
