import { PipeTransform, Pipe } from '@angular/core';
import { IEmployee } from '../models/Employee';

@Pipe({
  name: 'employeeFilter'
})
export class EmployeeFilterPipe implements PipeTransform {
  transform(employees: IEmployee[], searchTerm: string): IEmployee[] {

    if (!employees || !searchTerm) {
      return employees
    };

    return employees.filter(employee =>
      employee.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);

  }
}
