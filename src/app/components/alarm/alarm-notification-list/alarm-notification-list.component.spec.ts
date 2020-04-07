import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlarmNotificationListComponent } from './alarm-notification-list.component';

describe('AlarmNotificationListComponent', () => {
  let component: AlarmNotificationListComponent;
  let fixture: ComponentFixture<AlarmNotificationListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlarmNotificationListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlarmNotificationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
