import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './auth-service.service';
import { User } from './auth/user/user.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'my-app',
  template: `

  <div class='container-fluid'>
    <div class='row'>
      <div class='col-sm-3' *ngIf="currentUser | async">
        <app-nav-menu></app-nav-menu>
      </div>
      <router-outlet></router-outlet>
    </div>
  </div>


  `,
  styles: []
})
export class AppComponent {
  currentUser: Observable<User>;

  constructor(
    private router: Router,
    private authenticationService: AuthService
  ) {
    this.currentUser = this.authenticationService.currentUser;
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
