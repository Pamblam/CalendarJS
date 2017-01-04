# CalendarJS

A responsive calendar that does not require jQuery.. 

## Usage

**HTML**

     <div id='cal'></div>

**Javascript**

      var options = {abbrDay: true};
      var element = document.getElementById('cal');
      new calendar(element, options);
      
## Options

  **abbrDay**
  abbreviate the days on the calendar? Default: true.

**abbrMonth**
abbreviate the months? Default: true.

**abbrYear**
use a 2 digit year? Default: true.

**onDayClick**
a function that is called when the user click on a day. The date clicked is passed to this function.

**onEventClick**
a function that is called when the user clicks on an event. The event clicked is passed to this function.

**events**
an array of events to be displayed on the calendar. (see below)

**month**
the month of the calendar to display (`0` for January, `11` for December). Default is the current month.

**year**
the 4 digit year to show on the calendar. Default is the current year.

**ellipse**
ellipse overflowed text? Default is true.

## Events

To add events to the calendar you must pass an array of event objects to the `events` option. All events must have a 'desc' property and either a 'date' property or a 'startDate' and 'endDate' property.

### Event Options

**desc**
a short description of the event. (string)

**date**
the date of the event if it is a one day event. (JS Date object)

**startDate**
the start date of the event if it is a multiple day event. (JS Date object)

**endDate**
the end date of the event if it is a multiple day event. (JS Date object)

<hr>

See the index page for an example.
