import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EmployeeListComponent } from './employee.component';
import { EmployeeService } from '../employee.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeeFilterPipe } from './employee-filter.pipe';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { RouterLinkDirectiveStub } from './employee.stubs';
import { IEmployee } from '../models/Employee';

describe('EmployeeList', () => {
  let component: EmployeeListComponent;
  let fixture: ComponentFixture<EmployeeListComponent>; 
  let employeeService;
  const employeesResponse : IEmployee[] = [
    { id: 1, name: "Employee 1", email: "employee1@mail.com",  contactNo: 9999999, address: "Street Name 1" },
    { id: 2, name: "Employee 2", email: "employee2@mail.com",  contactNo: 5555555, address: "Street Name 2" },
    { id: 3, name: "Employee 3", email: "employee3@mail.com",  contactNo: 4444444, address: "Street Name 3" }      
  ];  
  
  beforeEach(async(() => {
    // Arrange
    // Create EmployeeService and Router Mocks
    employeeService = jasmine.createSpyObj('EmployeeService', ['getAllEmployees', 'deleteEmployee']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    // Mock service successfull service response
    employeeService.getAllEmployees.and.returnValue(of(employeesResponse));

    // Configure the test bed using the mocks
    TestBed.configureTestingModule({    
      imports: [ ReactiveFormsModule, FormsModule ],      
      providers: [ 
        { provide: EmployeeService, useValue: employeeService },
        { provide: Router, useValue: routerSpy }
      ],
      declarations: [ EmployeeListComponent, EmployeeFilterPipe, RouterLinkDirectiveStub ] });
    
    fixture = TestBed.createComponent(EmployeeListComponent);
    component = fixture.componentInstance;    
  }));

  it("should display the list of employees", () => {
    // Act
    fixture.detectChanges();    
    // Assert
    let employeeListRows = fixture.nativeElement.querySelectorAll("table>tbody>tr");
    console.log(employeeListRows.length);
    expect(employeeListRows.length).toBe(employeesResponse.length);
  }); 

  it("should display an empty list of employees", () => {
    // Arrange
    let emptyResponse = [];
    employeeService.getAllEmployees.and.returnValue(of(emptyResponse));
    // Act
    component.LoadEmployees();
    fixture.detectChanges();    
    let employeeListRows = fixture.nativeElement.querySelectorAll("table>tbody>tr");    
    // Assert
    expect(employeeListRows.length).toBe(0);
  });
});
