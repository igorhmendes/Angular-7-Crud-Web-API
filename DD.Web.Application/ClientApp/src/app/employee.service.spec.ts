import { EmployeeService } from './employee.service';
import { IEmployee } from './models/Employee';
import { of } from 'rxjs';

describe('EmployeeService', () => {  
  let employeeService : EmployeeService;
  let httpClient;

  // Run for every 'it' test 
  beforeEach(() => {  
    // create a spy object for httpClient service
    httpClient = jasmine.createSpyObj('HttClient', ['get', 'post', 'delete']);
    // instantiate the service using the spy
    employeeService = new EmployeeService(httpClient);    
  });

  it('should get all employees', () => {
      // Arrange
      const successfullResponse : IEmployee[] = [
        { id: 1, name: "Employee 1", email: "employee1@mail.com",  contactNo: 9999999, address: "Street Name 1" },
        { id: 2, name: "Employee 2", email: "employee2@mail.com",  contactNo: 5555555, address: "Street Name 2" },
        { id: 3, name: "Employee 3", email: "employee3@mail.com",  contactNo: 4444444, address: "Street Name 3" }      
      ]; 

      // Mocks httpClient call
      // the 'of' function receives a obj and returns an observable
      httpClient.get.and.returnValue(of(successfullResponse));

      // Act
      // get the observable response from the service and converts it to a promise
      let promise : Promise<IEmployee[]> = employeeService.getAllEmployees().toPromise();

      // Assert
      expect(httpClient.get.calls.count()).toBe(1, 'one call');    
      // add assertions to be run when the the promise is resolved 
      promise.then(resp => {
        expect(resp).toBeTruthy();
        expect(resp.length).toBe(successfullResponse.length);
      });
  });
});
