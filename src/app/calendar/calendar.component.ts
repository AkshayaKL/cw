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
} from 'angular-calendar';   //importing calendar elements
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
  selector: 'calendar',
  /* changeDetection: ChangeDetectionStrategy.OnPush,*/
  styleUrls: ['./calendar.component.css'],
  templateUrl: './calendar.component.html'
})
export class CalendarComponent {
  @ViewChild('modalContent', { static: true }) modalContent: any;
  
  view: CalendarView = CalendarView.Month; //Defining the view of the component

  CalendarView = CalendarView;
  events: CalendarEvent[]=[]; //Initialising an empty array to store the events(in this case, trainings)

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;  //Modal to display when the event is clicked
  };

  actions: CalendarEventAction[] = [              //Actions array that store the activities done by the calendar
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
  eventlist:any;  //A variable to get the trainings from the database
 

  

  activeDayIsOpen: boolean = true;



//


  constructor(private modal: NgbModal, private eventservice:EventsService, private datePipe: DatePipe)

     {
   
           this.eventlist = this.eventservice.getevents().subscribe(data=>
                                         {this.eventlist=this.eventservice.events;  //getting the event list from the service 

            //Traversing through each element gotten through the service

                                          this.eventlist.forEach(element=>{
  
                                               if(typeof(element.color ) === "string")
                                                           

                                                       {
                                                        element.color = colors[element.color];  //this-not necessary
                                                            
                                                        }
   


                                                  if(this.events.length) // checking if the events is not empty
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
                                                                                ];
                                                        }
                                                   else   //Initialising events with the first element if it's empty 
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

//constructor ends here 



//Function to control what happens if a day is clicked on the calendar

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void 
       {
                        if (isSameMonth(date, this.viewDate)) 
                        {
                              this.viewDate = date;
                         if (
                               (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
                                events.length === 0
                            )
                             {
                                 this.activeDayIsOpen = false;
                             }
                         else 
                         {
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




//Function to call when the user changes the timing of the event
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





//Function to open modal when an event happens

 handleEvent(action: string, event: CalendarEvent): void
  {
    
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

 

 //Function when the user clicks on add event
  addEvent(): void {
  if(!this.events)
    {

       this.events.push({

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
 //when user deletes an event
  deleteEvent(eventToDelete: CalendarEvent)
   {
    this.events = this.events.filter(event => event !== eventToDelete);
  }

  setView(view: CalendarView)
   {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
}

