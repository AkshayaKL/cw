
import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  Input,
  OnInit
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import '../flatpickr/dist/flatpickr.css';
import {EventsService} from '../events.service';
import {EnrollmentService} from '../enrollment.service';
import { FlatpickrModule } from 'angularx-flatpickr';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView
} from 'angular-calendar';
import {DatePipe} from '@angular/common';
const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};


@Component({
  selector: 'app-user-calendar',
  templateUrl: './user-calendar.component.html',
  styleUrls: ['./user-calendar.component.css']
})
export class UserCalendarComponent implements OnInit

 {
    newenrollmentdetail:any;
    allenrollmentdetail:any;

    @ViewChild('modalContent', { static: true }) modalContent: any;
  
  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;
  events: CalendarEvent[]=[];
  feedback:String;
  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      }
    },
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter(iEvent => iEvent !== event);
        this.handleEvent('Deleted', event);
      }
    }
  ];

  refresh: Subject<any> = new Subject();
  eventlist:any;
 

  

  activeDayIsOpen: boolean = true;

  constructor(private modal: NgbModal, private eventservice:EventsService, private datePipe: DatePipe,private enrollmentservice:EnrollmentService) {
   
   this.eventlist = this.eventservice.getevents().subscribe(data=>
   {this.eventlist=this.eventservice.events;
   console.log(this.eventlist);
    
    this.eventlist.forEach(element=>{
    /*element.start=this.datePipe.transform(element.start,"yyyy,MM,dd");
    element.end = this.datePipe.transform(element.end,"yyyy,MM,dd");*/
    if(typeof(element.color ) === "string")
     {
        element.color = colors[element.color];
     }
    console.log(element);


      if(this.events.length)
     { this.events = [
      ...this.events,
      {
        title: element.title,
        start: new Date(element.start),
        end: new Date(element.end),
        color: element.color,
        draggable: false,
        resizable: {
          beforeStart: element.resizable["beforeStart"],
          afterEnd: element.resizable["afterEnd"]
        }
      }
    ];}
    else
       {
         this.events = [{
                     title: element.title,
        start: new Date(element.start),
        end: new Date(element.end),
        color: element.color,
        draggable: false,
        resizable: {
          beforeStart: element.resizable["beforeStart"],
          afterEnd: element.resizable["afterEnd"]
         }}]
       }

    })




   }

   )
   
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      this.viewDate = date;
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
    }
  }






  eventTimesChanged({
    event,
    newStart,
    newEnd
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map(iEvent => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
   alert("Handling event");
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

enroll(event, course:any)
{
  this.userdetails1["CourseName"]=course.title;
  event.target.disabled=true;
  event.target.innerHTML = "Enrolled";
	this.enrollmentservice.enroll(this.userdetails1);

}

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }


  submitfeedback(detail:any)
  {
    this.enrollmentservice.submitfeedback(this.allenrollmentdetail);
  }
   
   displayfback:number=0;
  displayfeedback(event)
  {
  if(this.displayfback==0)
  {
  event.target.innerHTML = "Hide Feedback"
  this.displayfback =1;
  }
  else
  {
  event.target.innerHTML = "Provide Feedback for a better experience"
  this.displayfback =0;
  }

  }
  @Input()userdetails1:any;


  ngOnInit()
  {
     this.enrollmentservice.checkenrollment().subscribe(data=>{
     this.allenrollmentdetail = data;
   
     this.allenrollmentdetail.forEach(element=>
     {
       if(element.Name===this.userdetails1.name)
       {
          this.events.forEach(event=>
          {
               if(event.title ===element.Course)
               {
                         event["enrolled"]=true;
               }
          })
       }
     })



     });
     
  }

}
