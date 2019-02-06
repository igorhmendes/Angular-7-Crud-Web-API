import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './auth-service.service';
import { User } from './auth/user/user.component';

@Component({
  selector: 'my-app',
  template: `

  <div class='container-fluid'>
    <div class='row'>
      <div class='col-sm-3' *ngIf="currentUser">
        
      </div>
      
      
      <router-outlet></router-outlet>
      
    </div>
  </div>


  `,
  styles: []
})
export class AppComponent {
  currentUser: User;

  constructor(
    private router: Router,
    private authenticationService: AuthService
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
