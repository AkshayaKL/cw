import { Component, OnInit } from '@angular/core';
import {GetAdminFromDatabaseService } from '../get-admin-from-database.service';
import {GetUserFromDatabaseService } from '../get-user-from-database.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-adminpage',
  templateUrl: './adminpage.component.html',
  styleUrls: ['./adminpage.component.css']
})

export class AdminpageComponent implements OnInit {
change:number=0;            //Variable to switch the button's display to show/hideusers
results: any[] = [];         //An empty array declaration to push the users who match the search query into it               
displayusers:number = 0;         //Variable to display/hide the users, when the admin clicks show/hide users
queryField: FormControl = new FormControl(); // A formcontrol element for checking what the user enters on the search bar
displaydetails:number=0;   // variable to display the details of the user clicked upon, by the admin.
userattendance:any;        //This variable is used to store all the details of the user whose attendance has to be marked
dataofadmin = this.getadmin.dataofsignedinadmin;  //variable to store the signed in admin's data 
dataofsignedinusers:any;                 //variable to store all the details of users, fetched from the database
displaymenu:number=0;                   //variable to display the search dropdown                  
displaycalendar:number =0;             //variable to switch from calendar display


//We are calling instances of 2 services in the constructor
constructor(public getadmin:GetAdminFromDatabaseService, public getusers:GetUserFromDatabaseService, ) 
     {



      }







 //Function to display the results that match the search query.

  displaymatch()
  {
    this.displaymenu=1;       
                               // Called onfocus of the searcg bar

  }



// Function to hide the results that match the search query 2 seconds later

  hidematch()
  {
  setTimeout(()=>{    
                   this.displaymenu = 0;        
                }, 2000);
  
  }



 //Function to close the attendance details of the clicked user

  closedetails()
  {
    
    if(this.displaydetails==1)
       { 
          this.displaydetails = 0;            
       }
     document.getElementById("table").scrollIntoView();

  }


  //Function called after clicking on the "Mark Attendance" button 

  attendance(event, att:any):void
  {
  
     this.displaydetails=1;
     this.userattendance = att;
   
  }

  //Function called when the user clicks on "Display Users/Hide Users"

  submit(event):void
         {   
              if(this.change == 1)
                {
                   this.change=0;
                }
              else
               {
                   this.change = 1;
              }

              if(this.change)       
                 {
                     this.displayusers = 1;
                     this.getusers.GetUsers()   //calling the function "GetUsers() from GetUserFromDatabaseService"
                       .subscribe((data:any)=>
                          {
                              this.dataofsignedinusers=this.getusers.dataofsignedinusers;
                                console.log(this.dataofsignedinusers);
                          })
                    event.target.innerHTML="<span class='glyphicon glyphicon-user'></span>Hide Users";
                   }

             else
                    {
                      this.dataofsignedinusers=[];
                      event.target.innerHTML ="<span class='glyphicon glyphicon-user'></span>Display users";
                    }
          }




   

   

  // Function called when the user clicks on any search query result

  showuser(result:any):void
       {
           this.displaydetails=1;
           this.userattendance = result;
       }



  //Function called when the user changes  a particular users' particular course's attendance status


  markpresence(event, detail:any, course:string)
       {

          if(event.target.value=="Present")
           {    
               detail[course]=true;
           
               //Calling a function from the service GetUsersFromDatabse

               this.getusers.markpresence(detail).subscribe(data=>{ 
               if(data["message"]=="yes")
                  {
                      alert("Marked Present in the database");
                  }
               else
                 {
                      alert("Couldn't Mark");
                 }
                                                                   });
            }

         if(event.target.value == "-")
           { 
              detail[course]=false;
              this.getusers.markpresence(detail).subscribe(data=>{
                        if(data["message"]=="yes")
                        {
                           alert("Marked in the database"); 
                         }

                        else
                         {
                            alert("Couldn't Mark");
                         }
                                                                  });

           }
     }
 

 //Functions to display and hide calendar when the user clicks on display calendar/clicks the close button
      displaycalendar1()
           {
            this.displaycalendar=1;
            this.displaydetails = 0;
           }


        hidecalendar()
            {
                this.displaycalendar=0;
            }




 
  ngOnInit()  
  {


                   this.getusers.GetUsers()         //gets all user details from the service function    
                             .subscribe((data:any)=>
                                   {
                                     this.dataofsignedinusers=this.getusers.dataofsignedinusers;
                                    
                                    })
  
             this.queryField.valueChanges  //checking to see if the searchfield value matches with the name of signed in users
                            .subscribe( value => {

                                  this.dataofsignedinusers.forEach(user=>
                                       {
                                      if(user["Name"]==value)
                                        {
                                             this.results.push(user);
   
                                               
                                         }

                                     else
                                         {
                                            this.results.pop();
                                          }
                                                                    })
                                                    });
  }

  

   

}
