import { Component } from '@angular/core';
import { AuthService } from './../auth-service.service';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  public isCollapsed = true;
  public isExpanded = false;

  constructor(private authService: AuthService, private employeeService: EmployeeService) {
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  logout() {
    this.authService.logout();
  }




}


