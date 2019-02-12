import { AuthService } from './auth-service.service';
import { AuthResponse } from 'src/models/models';
import { of } from 'rxjs';
import { User } from './auth/user/user.component';

describe('AuthService', () => {

  let authService : AuthService;
  let router;
  let httpClient;
  
  beforeEach(() => {
    router = jasmine.createSpyObj('Router', ['navigate']);
    httpClient = jasmine.createSpyObj('HttpClient', ['post']);

    authService = new AuthService(router, httpClient);
  });

  it('should login the user', () => {
    // Arrange
    // Mock post call
    const expectedAuthResponse : AuthResponse = {
      username : "test@mail.com",
      firstName : "testFirstName",
      lastName : "test",
      id : 1,
      token : "test"
    };
    httpClient.post.and.returnValue(of(expectedAuthResponse));    
    let user: User = { userName: "test@mail.com", password: "12345" };   

    // Act
    authService.login(user);

    // Assert
    expect(httpClient.post.calls.count()).toBe(1, 'one call');

    authService.currentUser.subscribe(user => { 
      // verifies that currentUser is set, which means login was successful
      expect(authService.currentUserValue.userName).toBe(expectedAuthResponse.username);
      expect(authService.currentUserValue.firstName).toBe(expectedAuthResponse.firstName);
      expect(authService.currentUserValue.lastName).toBe(expectedAuthResponse.lastName);

      // verifies that router was called with the correct args
      const spy = router.navigate as jasmine.Spy;
      const navArgs = spy.calls.first().args[0];

      expect(navArgs).toContain("/home");
    });    
  });

  it('should logout the user', () => {
    // Act
    authService.logout();

    // Assert
    authService.currentUser.subscribe(user => { 
      // verifies successful logout
      expect(authService.currentUserValue).toBe(null);
      expect(authService.isLoggedIn).toBe(false);

      // verifies that router was called with the correct args
      const spy = router.navigate as jasmine.Spy;
      const navArgs = spy.calls.first().args[0];

      expect(navArgs).toContain("/login");      
    });
  });

});
