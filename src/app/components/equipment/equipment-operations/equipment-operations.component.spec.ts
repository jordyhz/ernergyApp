import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentOperationsComponent } from './equipment-operations.component';

describe('EquipmentOperationsComponent', () => {
  let component: EquipmentOperationsComponent;
  let fixture: ComponentFixture<EquipmentOperationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipmentOperationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipmentOperationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
