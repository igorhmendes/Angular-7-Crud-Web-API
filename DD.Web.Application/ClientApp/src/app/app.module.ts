//import { BrowserModule } from '@angular/platform-browser';
//import { NgModule } from '@angular/core';

//import { AppRoutingModule } from './app-routing.module';
//import { AppComponent } from './app.component';
//import { EmployeeComponent } from './employee/employee.component';
//import { AuthGuard } from './auth/auth.component';
//import { LoginComponent } from './login/login.component';
//import { NavMenuComponent } from './nav-menu/nav-menu.component';
////import { UserComponent } from './auth/user/user.component';

//@NgModule({
//  declarations: [
//    AppComponent,
//    EmployeeComponent,
//    AuthGuard,
//    LoginComponent,
//    NavMenuComponent
//  ],
//  imports: [
//    BrowserModule,
//    AppRoutingModule
//  ],
//  providers: [],
//  bootstrap: [AppComponent]
//})
//export class AppModule { }


import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Directive, HostBinding, HostListener } from '@angular/core';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';


import { HttpClientModule } from '@angular/common/http'; import { HttpModule } from '@angular/http';

import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
//Employee components
import { EmployeeComponent } from './employee/employee.component';
import { EmployeeUpdateComponent } from './employee/employee.component';
import { EmployeeListComponent } from './employee/employee.component'; 
import { EmployeeServiceService } from './employee-service.service';

import { CommonModule } from "@angular/common"
//import { EmployeeListComponent } from './employee/employee.component';
//import { IndexComponent } from './home/index/index.component';
import { LoginComponent } from './login/login.component';
//import { HeaderComponent } from './header/header.component';
import { AuthGuard } from './auth/auth.component';
import { AuthService } from './auth-service.service';
import { AppRoutingModule } from './app-routing.module';
import { EmployeeFilterPipe } from './employee/employee-filter.pipe';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
//import { MatSidenav } from '@angular/material';




@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    EmployeeComponent,
    EmployeeListComponent,
    EmployeeUpdateComponent,
    //IndexComponent,
    LoginComponent,
    //HeaderComponent,
    //NgbModule,
    EmployeeFilterPipe



  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    AppRoutingModule,
    NgbModule.forRoot()
    //MatSidenav,

  ],
  providers: [EmployeeServiceService, AuthService, AuthGuard],
  bootstrap: [AppComponent]
})


export class AppModule { }

