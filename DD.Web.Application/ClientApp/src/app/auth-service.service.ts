import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './auth/user/user.component';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class AuthService {


  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(private router: Router) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(user: User) {
    
    if (user.userName !== '' && user.password !== '') {
      this.loggedIn.next(true);
      this.router.navigate(['/home']);

      localStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUserSubject.next(user);

    }
  }

  logout() {
    this.loggedIn.next(false);
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);


  }
}
