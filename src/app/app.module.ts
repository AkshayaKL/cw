import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { SigninformComponent } from './signinform/signinform.component';
import { FooterComponent } from './footer/footer.component';
import { SigninformAdminComponent } from './signinform-admin/signinform-admin.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { DefaultPageComponent } from './default-page/default-page.component';
import {PagenotfoundComponent} from './pagenotfound/pagenotfound.component';
import { UserpageComponent } from './userpage/userpage.component';
import { AdminpageComponent } from './adminpage/adminpage.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { CalendarModule, DateAdapter } from 'angular-calendar'; 
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { FlatpickrModule } from 'angularx-flatpickr';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { CalendarComponent } from './calendar/calendar.component';
import {DatePipe} from '@angular/common';
import './flatpickr/dist/flatpickr.css';
import { UploadPostersComponent } from './upload-posters/upload-posters.component';
import { ReactiveFormsModule } from '@angular/forms';
import {FileSelectDirective} from'ng2-file-upload';
import { UserCalendarComponent } from './user-calendar/user-calendar.component';
const appRoutes : Routes = [

{path:'signin', component:SigninformComponent},
 {path: 'signin-admin', component:SigninformAdminComponent },
{path: 'login', component:LoginPageComponent},
{path:'',component: DefaultPageComponent},
{path:'user', component: UserpageComponent },
{path:'admin', component: AdminpageComponent},
{path:'calendar', component:CalendarComponent},
{path:'uploadimage', component:UploadPostersComponent}
];

@NgModule({
   declarations: [
      
      AppComponent,
      
      NavigationBarComponent,
      
      SigninformComponent,
      
      FooterComponent,
      
      SigninformAdminComponent,
      
      LoginPageComponent,
      
      DefaultPageComponent,

      PagenotfoundComponent,

      UserpageComponent,

      AdminpageComponent,

      CalendarComponent,

      UploadPostersComponent,

      FileSelectDirective,

      UserCalendarComponent
   ],
   imports: [
      
      NgbModalModule.forRoot(),
       ReactiveFormsModule,
      BrowserModule,
      FormsModule,
      HttpClientModule,
      FlatpickrModule.forRoot(),
      RouterModule.forRoot(
          appRoutes,
          {enableTracing : true}
      ),

      BrowserAnimationsModule, 
      CalendarModule.forRoot(
      { provide: DateAdapter, useFactory: adapterFactory })
   ],
   providers: [DatePipe],
   bootstrap: [AppComponent]
})

export class AppModule { }

