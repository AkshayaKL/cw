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
const appRoutes : Routes = [

{path:'signin', component:SigninformComponent},
 {path: 'signin-admin', component:SigninformAdminComponent },
{path: 'login', component:LoginPageComponent},
{path:'',component: DefaultPageComponent},
{path:'user', component: UserpageComponent }

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

      UserpageComponent
   ],
   imports: [
      BrowserModule,
      FormsModule,
      HttpClientModule,
      RouterModule.forRoot(
          appRoutes,
          {enableTracing : true}
      )
   ],
   providers: [],
   bootstrap: [AppComponent]
})

export class AppModule { }

