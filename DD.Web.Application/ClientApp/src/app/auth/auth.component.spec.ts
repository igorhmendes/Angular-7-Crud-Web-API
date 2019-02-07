import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthGuard } from './auth.component';
import { AuthService } from '../auth-service.service';

describe('AuthGuard', () => {
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers : [ AuthService ],
      declarations : [ AuthGuard ]
    })
    .compileComponents();
  }));

  it('should be created', () => {
    const service: AuthGuard = TestBed.get(AuthGuard);
    expect(service).toBeTruthy();
  });

});
