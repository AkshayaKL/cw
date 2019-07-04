import { Component, OnInit } from '@angular/core';
import {namepassword} from'../user';
import  {GetAdminFromDatabaseService} from '../get-admin-from-database.service';
import {GetUserFromDatabaseService } from '../get-user-from-database.service';
@Component({
  selector: 'app-signinform-admin',
  templateUrl: './signinform-admin.component.html',
  styleUrls: ['./signinform-admin.component.css']
})
export class SigninformAdminComponent implements OnInit {
error:number;
htmlContent:string;
dataofsignedinusers;
namepasswordadmin:namepassword=
{
	name:'',
	password:''
}
submitadminsignin(val:any):void{
	

this.getadmin.checkadmin(val)
         .subscribe(data=>
         {
          console.log(data);
          this.error=data;
          
         });
      this.checkerror(this.error);



     
}

checkerror(val:number):void{
 
 
  
  this.htmlContent = `<p>Invalid credentials</p>`;
 
 
}


  constructor(public getadmin:GetAdminFromDatabaseService, public getusers:GetUserFromDatabaseService ) { }
    
    

  ngOnInit() {
  }

}
