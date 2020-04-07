import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlarmNotificationMessageComponent } from './alarm-notification-message.component';

describe('AlarmNotificationMessageComponent', () => {
  let component: AlarmNotificationMessageComponent;
  let fixture: ComponentFixture<AlarmNotificationMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlarmNotificationMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlarmNotificationMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
