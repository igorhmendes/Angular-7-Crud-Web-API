import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { IEmployee } from './models/Employee';
import { Observable, of, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
//import { map } from 'rxjs/operators';
//import { read } from 'fs';

//import 'rxjs/add/operator/catch';
//import 'rxjs/add/operator/map';


@Injectable()
export class EmployeeServiceService {

  readonly rootUrl = environment.rootUrl + "/Home/";
  private _url: string = "/assets/data/employees.json";
  constructor(private http: HttpClient) { }

  saveEmployee(employee) {
    return this.http.post(this.rootUrl+ 'SaveEmployee', employee);
  }

  getAllEmployees(): Observable<IEmployee[]> {
    return this.http.get<IEmployee[]>(this.rootUrl + 'GetAllEmployees');
  }

  deleteEmployee(id) {
    return this.http.delete(this.rootUrl + 'DeleteEmployee/'+ id);
  }

  getEmployeeById(id): Observable<IEmployee> {
    return this.http.get<IEmployee>(this.rootUrl + 'GetEmployeeById/' + id);
  }

  updateEmployee(emp: IEmployee) {
    const params = new HttpParams().set('ID', emp.id.toString());
    const headers = new HttpHeaders().set('content-type', 'application/json');
    var body = {
      Name: emp.name, Email: emp.email, ID: emp.id, ContactNo: emp.contactNo, Address: emp.address
    }
    return this.http.put<IEmployee>(this.rootUrl + emp.id, body)  
  }

}
