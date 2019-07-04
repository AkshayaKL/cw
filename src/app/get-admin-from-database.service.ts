import { Injectable } from '@angular/core';
import {namepassword} from './user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RouterModule, Routes, Router } from '@angular/router';
import {Observable, of} from 'rxjs';
import { delay } from 'rxjs/internal/operators';
@Injectable({
  providedIn: 'root'
})
export class GetAdminFromDatabaseService {
errorvalue:number;
NamePassword:namepassword;
dataofsignedinadmin:any;

checkadmin(val:namepassword):Observable<number>{
   this.NamePassword=val;
   

     const headers = new HttpHeaders()
          .set('Authorization', 'my-auth-token')
          .set('Content-Type', 'application/json');
        
    this.http.post('http://127.0.0.1:4000/api/getadmin',JSON.stringify(this.NamePassword), {
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
        this.dataofsignedinadmin= data;
        console.log(this.dataofsignedinadmin);
        this.router.navigate(['admin']);
        this.errorvalue=1;
        
      }


    });
    return of(this.errorvalue);
    console.log(this.errorvalue);
     
    
  }
  

  constructor(private http:HttpClient, private router:Router) { }
}
