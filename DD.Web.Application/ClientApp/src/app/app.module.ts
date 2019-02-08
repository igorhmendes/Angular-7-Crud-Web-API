import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';

//Employee components
import { EmployeeComponent } from './employee/employee.component';
import { EmployeeUpdateComponent } from './employee/employee.component';
import { EmployeeListComponent } from './employee/employee.component'; 
import { EmployeeService } from './employee.service';

import { CommonModule } from "@angular/common"
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth/auth.component';
import { AuthService } from './auth-service.service';
import { AppRoutingModule } from './app-routing.module';
import { EmployeeFilterPipe } from './employee/employee-filter.pipe';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

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
    LoginComponent,
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
  providers: [EmployeeService, AuthService, AuthGuard],
  bootstrap: [AppComponent]
})


export class AppModule { }

