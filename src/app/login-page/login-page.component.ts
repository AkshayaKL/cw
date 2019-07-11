import { Component, OnInit } from '@angular/core';
import {user} from '../userinfo';
import {FormGroup,FormBuilder, FormControl} from '@angular/forms';
import { PutUserInsideDatabaseService } from '../put-user-inside-database.service';
import { RouterModule, Routes, Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
form:FormGroup;
userexists:boolean; //A variable to display if the user exists

user:user={
	name:'',
	eid:'',
	email:'',
	phone:'',
  password:'',
  confirmpassword:''
}                

//user is a variable of type user (which is a class exported from userinfo.ts)


  
  constructor(public putuser:PutUserInsideDatabaseService) {
    
    
 
   }


submitlogin(value:any):void //Function called when the user clicks on Submit button of login page

{

  
  this.putuser.setUser(this.user)  //calling setuser function from the service
   .subscribe(

   existence=>this.userexists=existence
  
   
   );
  
  

  }

  
  
  
  



  ngOnInit() {
  }

}
