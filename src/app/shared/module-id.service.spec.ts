import { TestBed } from '@angular/core/testing';

import { ModuleIdService } from './module-id.service';

describe('ModuleIdService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ModuleIdService = TestBed.get(ModuleIdService);
    expect(service).toBeTruthy();
  });
});
