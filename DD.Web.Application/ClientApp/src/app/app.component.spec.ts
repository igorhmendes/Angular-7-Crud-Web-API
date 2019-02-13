import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from './auth-service.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { NavMenuComponent } from './nav-menu/nav-menu.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        HttpModule,
        NgbModule        
      ],
      declarations: [
        AppComponent,
        NavMenuComponent
      ],
      
      providers: [AuthService]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

});
