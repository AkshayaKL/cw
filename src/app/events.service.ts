import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RouterModule, Routes, Router } from '@angular/router';
import {Observable, of} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView
} from 'angular-calendar';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

events:any;
eventadded:string;

   getevents():Observable<any>{
   const headers = new HttpHeaders()
       .set('Authorization','my-auth-token')
       .set('Content-Type', 'application/json');
  return this.http.post('http://127.0.0.1:4000/api/getevents' ,{"event":"none"},{
   headers:headers,})
     .pipe(
         map(data=>{
      this.events = data;
      console.log(this.events);
     }))
     }

     putevents(newevents:CalendarEvent[]):Observable<any>{
     console.log("events inside service");
     console.log(newevents);
      const headers = new HttpHeaders()
            .set('Authorization', 'my-auth-token')
            .set('Content-type','application/json');

    return this.http.post('http://127.0.0.1:4000/api/putevents',newevents,{
    headers:headers,}).pipe(
      map(data=>{

    if(data["message"]=="yes")
    {
    console.log("the data is sent");
    

    }
    }))
    }

     
  constructor(private http:HttpClient, private router:Router) {
   }
}
