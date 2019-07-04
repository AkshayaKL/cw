import { Component, OnInit } from '@angular/core';
import {GetAdminFromDatabaseService } from '../get-admin-from-database.service';
import {GetUserFromDatabaseService } from '../get-user-from-database.service';

@Component({
  selector: 'app-adminpage',
  templateUrl: './adminpage.component.html',
  styleUrls: ['./adminpage.component.css']
})

export class AdminpageComponent implements OnInit {
  change:number=0;
  
  constructor(public getadmin:GetAdminFromDatabaseService, public getusers:GetUserFromDatabaseService, ) { }
  dataofadmin = this.getadmin.dataofsignedinadmin;
  dataofsignedinusers:any;
  
  submit(event):void
  {   if(this.change == 1)
             {
               this.change=0;
             }
      else
             {
               this.change = 1;
             }

      if(this.change)       
      {
      this.getusers.GetUsers()
      .subscribe((data:any)=>
      {
          this.dataofsignedinusers=this.getusers.dataofsignedinusers;
          console.log(this.dataofsignedinusers);
      })
    }

    else
    {
    this.dataofsignedinusers=[];
    }


  }
  ngOnInit() {
  

    console.log(this.dataofsignedinusers);


  }

   

}
