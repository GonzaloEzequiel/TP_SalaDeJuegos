import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { incFormGuard } from './inc-form-guard';

describe('incFormGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => (incFormGuard as any)(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
