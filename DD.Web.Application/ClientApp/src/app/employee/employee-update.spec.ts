import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmployeeUpdateComponent } from './employee.component';
import { EmployeeService } from '../employee.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IEmployee } from '../models/Employee';
import { of } from 'rxjs';

describe('EmployeeUpdateComponent', () => {
  let component: EmployeeUpdateComponent;
  let fixture: ComponentFixture<EmployeeUpdateComponent>; 
  let employeeService;
  const successfulResponse: IEmployee = { id: 1, name: "Employee1", address: "Address 1", contactNo: 9999999, email: "mail@mail.com" };

  beforeEach(() => {
    // Arrange
    // Create EmployeeService and Router Mocks
    employeeService = jasmine.createSpyObj('EmployeeService', ['getEmployeeById', 'updateEmployee']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    // Configure the test bed using the mocks
    TestBed.configureTestingModule({    
      imports: [ ReactiveFormsModule, FormsModule ],      
      providers: [ 
        { provide: EmployeeService, useValue: employeeService },
        { provide: Router, useValue: routerSpy }         
      ],
      declarations: [ EmployeeUpdateComponent ] });
    
    fixture = TestBed.createComponent(EmployeeUpdateComponent);
    component = fixture.componentInstance;    

    // Arrange
    employeeService.getEmployeeById.and.returnValue(of(successfulResponse));
  });

  it('should create the component', () => {
    // Act 
    fixture.detectChanges();

    // Assert
    expect(component).toBeTruthy();
  });

  it("should update the employee", () => {
    // Arrange    
    employeeService.getEmployeeById.and.returnValue(of(successfulResponse));
    Object.keys(successfulResponse).forEach(key => component.emp[key] = successfulResponse[name]);

    // Act
    component.editEmployee();
    fixture.detectChanges(); // after ngOnInit

    // Assert
    
    expect(component.employeeForm.pristine).toBe(true); 

  }); 
});
