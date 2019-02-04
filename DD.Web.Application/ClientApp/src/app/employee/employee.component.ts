import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
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

  employeeForm: FormGroup

  constructor(private employeeService: EmployeeServiceService, private fb: FormBuilder) {
    this.createForm();
  }
  
  ngOnInit() {
  }

  createForm() {
    const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const PhoneValidation = "^[7-9][0-9]{9}$";

    this.employeeForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required, Validators.pattern(emailPattern)],
      address: [],
      contactNo: ['', Validators.required, Validators.pattern(PhoneValidation)]
    });
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
  //templateUrl: './updateEmployee.html',
  templateUrl: './updateEmployee.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeUpdateComponent implements OnInit {

  emp: IEmployee = new IEmployee();
  _id: number;

  employeeForm: FormGroup
  name: FormControl
  email: FormControl
  address: FormControl
  contactNo: FormControl
  teste: string = 'Igor';

  constructor(private employeeService: EmployeeServiceService, private _route: ActivatedRoute, private fb: FormBuilder, private router: Router ) {
  }

  //@Output() nameEvent = new EventEmitter<string>();
  //@ViewChild('closeBtn') cb: ElementRef;

 
  ngOnInit() {
    var self = this;
        this._route.params.subscribe(params => {
        this.employeeService.getEmployeeById(params['id']).subscribe(res => {
          self.emp = res;
          self._id = self.emp.id;
        });
      });
    

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

  editEmployee() {
      this.employeeService.updateEmployee(this.emp).subscribe(res => {
      alert("Employee updated successfully");
      //this.nameEvent.emit("ccc");
      //this.cb.nativeElement.click();

        this.router.navigate(['/listEmployee']);
    },  
 )};
}  
