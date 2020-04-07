import { TestBed } from '@angular/core/testing';

import { AlarmNotificationService } from './alarm-notification.service';

describe('AlarmNotificationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AlarmNotificationService = TestBed.get(AlarmNotificationService);
    expect(service).toBeTruthy();
  });
});
