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
userexists:boolean;

user:user={
	name:'',
	eid:'',
	email:'',
	phone:'',
  password:'',
  confirmpassword:''
}


  
  constructor(public putuser:PutUserInsideDatabaseService) {
    
    
 
   }


submitlogin(value:any):void{

  
  this.putuser.setUser(this.user)
   .subscribe(

   existence=>this.userexists=existence
  
   
   );
  
  

  }

  
  
  
  



  ngOnInit() {
  }

}
