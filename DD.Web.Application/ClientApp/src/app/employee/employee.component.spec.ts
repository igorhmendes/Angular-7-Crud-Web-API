import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { EmployeeListComponent } from './employee.component';
import { EmployeeService } from '../employee.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { DebugElement, Component, Directive, Input, HostListener } from '@angular/core';
import { EmployeeFilterPipe } from './employee-filter.pipe';
import { of } from 'rxjs';
import { RouterModule, Router } from '@angular/router';

@Directive({
  selector: '[routerLink]'
})
export class RouterLinkDirectiveStub {
  @Input('routerLink') linkParams: any;
  navigatedTo: any = null;

  @HostListener('click')
  onClick() {
    this.navigatedTo = this.linkParams;
  }
}

describe('EmployeeListComponent', () => {
  let component: EmployeeListComponent;
  let fixture: ComponentFixture<EmployeeListComponent>; 
  let employeeService;
  
  beforeEach(async(() => {

    var employeesResponse = [
      { id: 1, name: "Employee 1", email: "employee1@mail.com",  contactNo: "9999999", address: "Street Name 1" },
      { id: 2, name: "Employee 2", email: "employee2@mail.com",  contactNo: "5555555", address: "Street Name 2" },
      { id: 3, name: "Employee 3", email: "employee3@mail.com",  contactNo: "4444444", address: "Street Name 3" }      
    ]; 

    employeeService = jasmine.createSpyObj('EmployeeService', ['getAllEmployees']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    employeeService.getAllEmployees.and.returnValue(of(employeesResponse));

    TestBed.configureTestingModule({    
      imports: [ ReactiveFormsModule, FormsModule ],
      providers: [ 
        { provide: EmployeeService, useValue: employeeService },
        { provide: Router, useValue: routerSpy }         
      ],
      declarations: [ EmployeeListComponent, EmployeeFilterPipe, RouterLinkDirectiveStub ]
    });
    
    fixture = TestBed.createComponent(EmployeeListComponent);
    component = fixture.componentInstance;
    
  }));

  it('should create the component', () => {
    fixture.detectChanges(); // onInit() called
    let employeeListRows = fixture.nativeElement.querySelectorAll("#employees-list>tbody>tr");
    expect(employeeListRows.length).toBeDefined(3);
  });

});
