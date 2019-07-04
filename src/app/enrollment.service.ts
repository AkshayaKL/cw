import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map, tap} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {

UserandEnrollmentstatus:any;
checkenrollment():Observable<any>
{
	const headers = new HttpHeaders()
	      .set('Authorization','my-auth-token')
	      .set('Content-type','application/json');
	return this.http.post('http://127.0.0.1:4000/api/checkenrollment',{},{
	headers:headers
	})
	
}
enroll(details:any):void
{
	const headers = new HttpHeaders()
       .set('Authorization','my-auth-token')
       .set('Content-Type', 'application/json');
  this.http.post('http://127.0.0.1:4000/api/putenrollmentdetails' ,details,{
   headers:headers,})
     .subscribe(data=>
      
      {this.UserandEnrollmentstatus = data;
      if(data["message"]=="Enrolled")
      {
        alert(data["message"]);

      }
      else
      {
      alert("There seems to be an error");
      }
      
      }
     )
}

submissiondetails:number;
submitfeedback(details:any):void
{
  const headers = new HttpHeaders()
   .set('Authorization','my-auth-token')
   .set('Content-type','application/json');

   this.http.post('http://127.0.0.1:4000/api/submitfeedback',details,{headers:headers,})
      .subscribe(data=>
      {
         if(data["message"]=="submitted")
         {
           this.submissiondetails=1;
           alert("1");
         }

          else
          {
            this.submissiondetails=0;
            alert("0");
          }
      })
}

  constructor(private http:HttpClient) { }
}
