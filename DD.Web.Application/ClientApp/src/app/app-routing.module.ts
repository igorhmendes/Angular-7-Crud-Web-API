import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './auth/auth.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeeListComponent } from './employee/employee.component';
import { EmployeeUpdateComponent } from './employee/employee.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'employee', component: EmployeeComponent, canActivate : [ AuthGuard] },
  { path: 'home', component: HomeComponent },
  { path: 'counter', component: CounterComponent },
  { path: 'fetch-data', component: FetchDataComponent },
  { path: 'listEmployee', component: EmployeeListComponent, canActivate : [AuthGuard] },
  { path: 'updateEmployee/:id', component: EmployeeUpdateComponent, canActivate : [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
