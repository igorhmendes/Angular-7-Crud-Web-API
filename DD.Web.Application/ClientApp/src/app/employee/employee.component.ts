import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EmployeeServiceService } from '../employee-service.service';
import { IEmployee } from '../models/Employee';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(private employeeService: EmployeeServiceService) { }
  employeeForm: FormGroup
  name: FormControl
  email: FormControl
  address: FormControl
  contactNo: FormControl

  ngOnInit() {
    const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const PhoneValidation = "^[7-9][0-9]{9}$";
    this.name = new FormControl('', [Validators.required]);
    this.email = new FormControl('', [Validators.required, Validators.pattern(emailPattern)]);
    this.address = new FormControl();
    this.contactNo = new FormControl('', [Validators.required, Validators.pattern(PhoneValidation)]);

    this.employeeForm = new FormGroup({
      name: this.name,
      email: this.email,
      address: this.address,
      contactNo: this.contactNo
    })
  }

  saveEmployee(obj: any) {
    this.employeeService.saveEmployee(obj).subscribe((data): any => {
      if (data) {
        alert("Save Successfully");
      }
      this.employeeForm.reset();

    });
  }

}





@Component({
  selector: 'app-list-employee',
  templateUrl: './listEmployee.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeListComponent implements OnInit {

  employees: IEmployee[];
  searchTerm: string;
  tempemp: IEmployee;

  constructor(private employeeService: EmployeeServiceService) { }


  ngOnInit() {
    this.LoadEmployees();// this.employeeService.getAllEmployees().subscribe(data => this.employees = data);
  }



  deleteEmployee(id) {

    if (confirm("Are you sure you want to delete this ?")) {
      this.tempemp = new IEmployee();
      this.tempemp.id = id;
      this.employeeService.deleteEmployee(id).subscribe(res => {
        alert("Deleted successfully !!!");
        this.LoadEmployees();
      })
    }
  }  


  LoadEmployees() {
    this.employeeService.getAllEmployees().subscribe(data => this.employees = data);
  }


  //EditEmployee(regForm: NgForm) {
  //  this.employeeService.EditEmployee(this.objemp).subscribe(res => {
  //    alert("Employee updated successfully");
  //    this.nameEvent.emit("ccc");
  //    this.cb.nativeElement.click();

  //  },  
  //};


}



@Component({
  selector: 'app-employeeUpdate',
  templateUrl: './updateEmployee.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeUpdateComponent implements OnInit {

  emp: IEmployee;
  _id: number;

  employeeForm: FormGroup
  name: FormControl
  email: FormControl
  address: FormControl
  contactNo: FormControl

  constructor(private employeeService: EmployeeServiceService, private _route: ActivatedRoute, ) {
  }

  //@Output() nameEvent = new EventEmitter<string>();
  //@ViewChild('closeBtn') cb: ElementRef;
  ngOnInit() {
    const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const PhoneValidation = "^[7-9][0-9]{9}$";
    this.name = new FormControl('', [Validators.required]);
    this.email = new FormControl('', [Validators.required, Validators.pattern(emailPattern)]);
    this.address = new FormControl();
    this.contactNo = new FormControl('', [Validators.required, Validators.pattern(PhoneValidation)]);

    this.employeeForm = new FormGroup({
      name: this.name,
      email: this.email,
      address: this.address,
      contactNo: this.contactNo
    })

    //this.employeeService.getEmployeeById(1).subscribe(data => this.emp = data);
    this.employeeService.getEmployeeById(this._route.snapshot.params['id']).toPromise().then(data => {
      this.emp = data;
      this._id = this.emp.id;
    });
    
    //this.EditEmployee(this.emp);
  }
  //@Input() reset: boolean = false;
  //@ViewChild('regForm') myForm: NgForm;
  //@Input() isReset: boolean = false;
  //objtempemp: IEmployee;
  //@Input() objemp: IEmployee = new IEmployee();
  editEmployee(emp: IEmployee) {
      emp.id = this._id;
      this.employeeService.updateEmployee(emp).subscribe(res => {
      alert("Employee updated successfully");
      //this.nameEvent.emit("ccc");
      //this.cb.nativeElement.click();

    },  
 )};
}  
