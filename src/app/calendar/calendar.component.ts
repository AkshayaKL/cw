import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef
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
  selector: 'mwl-demo-component',
  /* changeDetection: ChangeDetectionStrategy.OnPush,*/
  styleUrls: ['./calendar.component.css'],
  templateUrl: './calendar.component.html'
})
export class CalendarComponent {
  @ViewChild('modalContent', { static: true }) modalContent: any;
  
  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;
  events: CalendarEvent[]=[];

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

  constructor(private modal: NgbModal, private eventservice:EventsService, private datePipe: DatePipe) {
   
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
        draggable: element.draggable,
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
        draggable: element.draggable,
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


 eventsareset():void
 {
        this.eventservice.putevents(this.events).subscribe(data=>{
        console.log(data);
        });
        
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

  addEvent(): void {
  if(!this.events)
    {this.events.push({

        title: 'New event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: colors.red,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true
        }
    })
  }
   else
   { this.events = [
      ...this.events,
      {
        title: 'New event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: colors.red,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true
        }
      }
    ];
    }


  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter(event => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
}

