import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { IEmployee } from './models/Employee';
import { Observable, of, Subject } from 'rxjs';
//import { map } from 'rxjs/operators';
//import { read } from 'fs';

//import 'rxjs/add/operator/catch';
//import 'rxjs/add/operator/map';


@Injectable()
export class EmployeeServiceService {

  readonly rootUrl = 'https://localhost:5001';
    //44342';

  private _url: string = "/assets/data/employees.json";
  constructor(private http: HttpClient) { }

  saveEmployee(employee) {
    return this.http.post(this.rootUrl + '/api/Home/SaveEmployee', employee);
  }

  getAllEmployees(): Observable<IEmployee[]> {
    return this.http.get<IEmployee[]>(this.rootUrl + '/api/Home/GetAllEmployees');

    //return this.http.get<IEmployee[]>(this._url);
  }

  deleteEmployee(id) {
    return this.http.delete(this.rootUrl + '/api/Home/DeleteEmployee/'+ id);
  }

  getEmployeeById(id): Observable<IEmployee> {
    return this.http.get<IEmployee>(this.rootUrl + '/api/Home/GetEmployeeById/' + id);
  }

  updateEmployee(emp: IEmployee) {
    const params = new HttpParams().set('ID', emp.id.toString());
    const headers = new HttpHeaders().set('content-type', 'application/json');
    var body = {
      Name: emp.name, Email: emp.email, ID: emp.id, ContatoNo: emp.contactNo, Address: emp.address
    }
    return this.http.put<IEmployee>(this.rootUrl + '/api/Home/' + emp.id, body)  
  }

}
