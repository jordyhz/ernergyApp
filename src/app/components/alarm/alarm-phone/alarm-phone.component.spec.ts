import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlarmPhoneComponent } from './alarm-phone.component';

describe('AlarmPhoneComponent', () => {
  let component: AlarmPhoneComponent;
  let fixture: ComponentFixture<AlarmPhoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlarmPhoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlarmPhoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
