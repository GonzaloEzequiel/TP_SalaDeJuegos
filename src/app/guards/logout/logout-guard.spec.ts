import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { logoutGuard } from './logout-guard';

describe('logoutGuard', () => {
  const executeGuard = (...guardParameters: unknown[]) => 
      TestBed.runInInjectionContext(() => (logoutGuard as any)(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
