import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable, of} from 'rxjs';
import { RouterModule, Routes, Router } from '@angular/router';
import { delay } from 'rxjs/internal/operators';
import {map, tap} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class PosterServiceService {
           filen:any;
           response:any;
          PostPosters(file:any):Observable<any>
          {
                const headers = new HttpHeaders()
                        .set('Authorization', 'my-auth-token');
                        
                        headers.append('enctype', 'multipart/form-data');

             console.log("Object is inside service");
            console.log(file);
            console.log("Tadaa");
   
           
          

            this.http.post('http://127.0.0.1:4000/api/postposters',file,{headers:headers})
             
                    .subscribe(
                           data=>
                           {
                              if(data["message"]=="yes")
                              {
                                alert("Image Uploaded");
                                this.response = data;
                                
                              }
                              else
                              {
                              alert("Image couldn't be uploaded");
                              this.response = data;
                              }
                           });
                           return of(this.response)
                           }


           

  constructor(public router:Router, public http:HttpClient) { }
}
