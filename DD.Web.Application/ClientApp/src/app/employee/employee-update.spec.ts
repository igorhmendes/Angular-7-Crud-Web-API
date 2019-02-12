import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EmployeeListComponent, EmployeeUpdateComponent } from './employee.component';
import { EmployeeService } from '../employee.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeeFilterPipe } from './employee-filter.pipe';
import { Router } from '@angular/router';
import { RouterLinkDirectiveStub } from './employee.stubs';

describe('EmployeeUpdateComponent', () => {
  let component: EmployeeUpdateComponent;
  let fixture: ComponentFixture<EmployeeUpdateComponent>; 
  let employeeService;

  beforeEach(async(() => {
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
      declarations: [ EmployeeListComponent, EmployeeFilterPipe, RouterLinkDirectiveStub ] });
    
    fixture = TestBed.createComponent(EmployeeUpdateComponent);
    component = fixture.componentInstance;    
  }));

  it("should create the element", () => {
    // Act
    fixture.detectChanges(); // after ngOnInit
    const updtResponse = {};

    // Assert
    

  }); 
});
