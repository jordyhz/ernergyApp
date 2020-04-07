import { TestBed } from '@angular/core/testing';

import { ModuleScreenService } from './module-screen.service';

describe('ModuleScreenService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ModuleScreenService = TestBed.get(ModuleScreenService);
    expect(service).toBeTruthy();
  });
});
