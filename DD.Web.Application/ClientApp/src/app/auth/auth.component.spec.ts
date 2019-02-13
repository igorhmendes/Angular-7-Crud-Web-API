import { AuthGuard } from './auth.component';
import { AuthService } from '../auth-service.service';

describe('AuthGuard', () => {
  
  let router;
  let authService;
  let authGuard : AuthGuard;

  beforeEach(() => {
    authService = new AuthService(null, null);    
    authGuard = new AuthGuard(authService, router);
  });

  it('it should allow activation', () => {
    // Arrange
    spyOnProperty(authService, "isLoggedIn").and.returnValue(true);

    // Act
    let authGuardResponse = authGuard.canActivate(null, null);

    // Assert
    expect(authGuardResponse).toBe(true);
  });

  it('it should deny activation', () => {
    // Arrange
    spyOnProperty(authService, "isLoggedIn").and.returnValue(false);

    // Act
    let authGuardResponse = authGuard.canActivate(null, null);

    // Assert
    expect(authGuardResponse).toBe(false);
  });

});
