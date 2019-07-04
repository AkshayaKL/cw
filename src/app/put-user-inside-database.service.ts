import { Injectable } from '@angular/core';
import {user} from './userinfo';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable, of} from 'rxjs';
import { RouterModule, Routes, Router } from '@angular/router';
import {map, tap} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})



export class PutUserInsideDatabaseService {

newuser:user;
existence:boolean;






setUser(val:user):Observable<boolean> {
    this.newuser=val;
     
    const headers = new HttpHeaders()
          .set('Authorization', 'my-auth-token')
          .set('Content-Type', 'application/json');

    this.http.post('http://127.0.0.1:4000/api/pushusers', JSON.stringify(this.newuser), {
      headers: headers, 
    })
    .subscribe(data => {
      if(data["message"]=="m")
      {  
      this.existence=true;

      }
      if(data["message"]=="yay")
      {
      this.existence=false;
      }

    });
    return of(this.existence);
  }

  





  constructor(private http: HttpClient, private router:Router) { }

}
