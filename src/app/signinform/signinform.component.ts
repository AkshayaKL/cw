import { Component, OnInit } from '@angular/core';
import {namepassword} from '../user';
import {GetUserFromDatabaseService} from '../get-user-from-database.service';

@Component({
  selector: 'app-signinform',
  templateUrl: './signinform.component.html',
  styleUrls: ['./signinform.component.css']
})
export class SigninformComponent implements OnInit {

namepassword:namepassword={
	name:'',
	password:''
}


error:number;
htmlContent:string;
trysignin:boolean;

constructor(public getuser:GetUserFromDatabaseService) { }

submitsignin(value:any):void{
 
  
  this.error=this.getuser.putUser
  (this.namepassword);
  this.checkerror(this.error);
  this.trysignin=true;
  
}
 checkerror(val:number):void{
 
 
  
  this.htmlContent = `<p>Invalid credentials</p>`;
 
 
}
  ngOnInit() {
  }


  }