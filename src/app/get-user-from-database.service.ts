import { Injectable } from '@angular/core';
import {user} from './userinfo';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {namepassword} from './user';
import { RouterModule, Routes, Router } from '@angular/router';
import { delay } from 'rxjs/internal/operators';
import {map, tap} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})



export class GetUserFromDatabaseService {
 errorvalue:number;
 
dataofsignedinuser:any;
dataofsignedinusers:any;
NamePassword:namepassword;
putUser(val:namepassword):number{
	 
    this.NamePassword=val;
    console.log(this.NamePassword);
    console.log("signed in service");
    return this.checkuser();  

}


checkuser():number{
    const headers = new HttpHeaders()
          .set('Authorization', 'my-auth-token')
          .set('Content-Type', 'application/json');
          
this.http.post('http://127.0.0.1:4000/api/getuser',JSON.stringify(this.NamePassword), {
      headers: headers, 
    })
    .subscribe(data => {
      if(data["message"]=="wrong")
      {
         console.log("following is the error value");
         this.errorvalue=0;
          
      }
      else
      {
        this.dataofsignedinuser = data;
        this.router.navigate(['user']);
        this.errorvalue=1;
        
      }


    });
    console.log(this.errorvalue);
    return this.errorvalue;
  }
    
  
  GetUsers():Observable<any>{
  const headers = new HttpHeaders()
                .set('Authorization', 'my-auth-token')
                .set('Content-type', 'application/json');



 return this.http
       .post('http://127.0.0.1:4000/api/getusers', {
      headers: headers, 
    })
    .pipe(


    map(
          data => {
      
      if(data["message"]=="error")
       {
          console.log("Hasn't been fetched");
          this.dataofsignedinusers ="error";
       }    
      else
        {
        console.log("data in get-user-from-database service");
        
        this.dataofsignedinusers = data;
        console.log(this.dataofsignedinusers);

           }   


    }));




  }
 
  constructor(private http:HttpClient, private router:Router) { 
              
  





  }
}