import {ComponentFixture, TestBed } from '@angular/core/testing';
import {ReactiveFormsModule, FormsModule } from '@angular/forms';

import { EmployeeComponent} from './employee.component';
import { IEmployee } from '../models/Employee';
import { EmployeeService } from '../employee.service';
import { HttpClient, HttpHandler } from '@angular/common/http';


describe('Component: Employee Create', () => {
  let component: EmployeeComponent;
  let fixture: ComponentFixture<EmployeeComponent>;

   beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule],      
      declarations: [ EmployeeComponent ],
      providers: [EmployeeService, HttpClient, HttpHandler]
    });

    fixture = TestBed.createComponent(EmployeeComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.employeeForm.valid).toBeFalsy();
  });
  

  it('email field validity', () => {
    let errors = {};
    let email = component.employeeForm.controls['email'];
    expect(email.valid).toBeFalsy();

    // Email field is required
    errors = email.errors || {};
    expect(errors['required']).toBeTruthy();

    // Set email to something
    email.setValue("test");
    errors = email.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['pattern']).toBeTruthy();

    // Set email to something correct
    email.setValue("test@example.com");
    errors = email.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['pattern']).toBeFalsy();
});



it('contactNo field validity', () => {
  let errors = {};
  let contact = component.employeeForm.controls['contactNo'];
  expect(contact.valid).toBeFalsy();

  // Email field is required
  errors = contact.errors || {};
  expect(errors['required']).toBeTruthy();

  // Set phone to something
  contact.setValue("test");
  errors = contact.errors || {};
  expect(errors['required']).toBeFalsy();
  expect(errors['pattern']).toBeTruthy();

  // Set email to something correct
  contact.setValue("7777-88888");
  errors = contact.errors || {};
  expect(errors['required']).toBeFalsy();
  expect(errors['pattern']).toBeFalsy();
});


it('submitting a form emits a employee', () => {
  
  expect(component.employeeForm.valid).toBeFalsy();

  component.employeeForm.controls['email'].setValue("test@test.com");
  component.employeeForm.controls['name'].setValue("Test Smith");
  component.employeeForm.controls['address'].setValue("257th Street Test");
  component.employeeForm.controls['contactNo'].setValue("7777-88888");

  expect(component.employeeForm.valid).toBeTruthy();

  component.saveEmployee(component);

  /*let employee: IEmployee;
  // Subscribe to the Observable and store the user in a local variable.
  component.saveEmployee.a((value) => employee = value);

  // Now we can check to make sure the emitted value is correct
  expect(employee.email).toBe("test@test.com");
  expect(employee.name).toBe("Test Da Silva");
  expect(employee.address).toBe("257th Street Test");
  expect(employee.contactNo).toBe("7777-88888");*/

});


  
});
