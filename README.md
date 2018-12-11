
<h2><a href='https://pamblam.github.io/CalendarJS/'>CalendarJS</a></h2>
<p>A simple responsive Javascript calendar with no dependencies.</p>
<p>CalendarJS is a general-purpose calendar which can be employed to fit just about any use-case from event calendars, to date pickers and date-range pickers.</p>

<p><b><a href='https://pamblam.github.io/CalendarJS/'>Refer to the man page for examples and styling.</a></b></p>

<h3>Calendar Options</h3><hr>
<ul>
	<li>options[<b>abbrDay</b>] <i>bool</i>: Abbreviate the day names? default: true</li>
	<li>options[<b>abbrMonth</b>] <i>bool</i>: Abbreviate the month names? default: true</li>
	<li>options[<b>abbrYear</b>] <i>bool</i>: Abbreviate the year? default: true</li>
	<li>options[<b>month</b>] <i>int</i>: The month to show, eg 1 for January, 2 for February, etc. default: the current month</li>
	<li>options[<b>year</b>] <i>int</i>: The year to show. default: the current year</li>
	<li>options[<b>ellipse</b>] <i>bool</i>: Ellipsis overflow text? default: true</li>
	<li>options[<b>events</b>] <i>array</i>: An array of event objects. See below</li>
	<li>options[<b>onDayClick</b>] <i>function</i>: function to execute when a day is clicked</li>
	<li>options[<b>onEventClick</b>] <i>function</i>: function to execute when an event is clicked</li>
</ul>

<h3>Event Options</h3><hr>
<ul>
	<li>event[<b>desc</b>] <i>string</i>: A short description of the event.</li>
	<li>event[<b>date</b>] <i>date</i>: The date of the event</li>
	<li>event[<b>startDate</b>] <i>date</i>: The start date of the event, to be used as an alternative to <i>date</i> to be used along with <i>endDate</i>.</li>
	<li>event[<b>endDate</b>] <i>date</i>: The end date of the event, to be used as an alternative to <i>date</i> to be used along with <i>startDate</i>.</li>
</ul>

<h3>Methods</h3><hr>
<ul>
	<li>calendar.<b>getSelection</b>(): Get an array of dates that are selected on the calendar.</li>
	<li>calendar.<b>selectDateRange</b>(date1, date2): Given two date objects, all dates in this range will be selected on the calendar.</li>
	<li>calendar.<b>selectDate</b>(date): Given a date objects, this date will be selected on the calendar.</li>
	<li>calendar.<b>clearSelection</b>(): Clear all selected dates on the calendar.</li>
	<li>calendar.<b>getEventsDuring</b>(date1, date2): Given two date objects, get an array of events listed on the calendar in this range.</li>
	<li>calendar.<b>loadPreviousMonth</b>(): Show the previous month on the calendar.</li>
	<li>calendar.<b>loadNextMonth</b>(): Show the next month on the calendar.</li>
	<li>calendar.<b>addEvent</b>(event): Given an event object, adds the event to the calendar.</li>
</ul>

<h3>License</h3><hr>

Copyright 2018 Rob Parham

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
