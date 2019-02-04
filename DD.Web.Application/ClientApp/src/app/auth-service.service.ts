import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './auth/user/user.component';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

class AuthResponse {
  id : number;
  username : string;
  firstName : string;
  lastName : string;
  token : string
}

@Injectable()
export class AuthService {

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  get isLoggedIn() {
    return this.loggedIn.value;
  }

  constructor(private router: Router, private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(user: User) {
    if (user.userName !== '' && user.password !== '') {
      let self = this;
      this.http.post<AuthResponse>(environment.rootUrl + '/Users/Authenticate', {
        "userName" : user.userName,
        "password" : user.password
      }).subscribe(resp => {     

        self.loggedIn.next(true);
        this.currentUserSubject.next(
          { 
            userName : resp.username,
            firstName : resp.firstName,
            lastName : resp.lastName         
          });

        localStorage.setItem('currentUser', JSON.stringify(resp.token));
        self.router.navigate(['/home']);
      });
    }
  }

  logout() {
    this.loggedIn.next(false);
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }
}
