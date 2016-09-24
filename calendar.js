

;window.calendar = function(elem, opts) {
	var self = this;
	
	////////////////////////////////////////////////////////////////////////////
	// User config /////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////
	
	self.elem = elem;
	self.abbrDay = false;
	self.abbrMonth = false;
	self.abbrYear = false;
	self.onDayClick = function(){};
	self.events = [];
	self.month = (new Date()).getMonth();
	self.year = (new Date()).getFullYear();
	self.ellipse = true;
	
	////////////////////////////////////////////////////////////////////////////
	// Strings /////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////

	self.daysOfWeekFull = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	self.daysOfWeekAbbr = ["Sun", "Mon", "Tues", "Wedns", "Thurs", "Fri", "Sat"];
	self.monthsFull = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	self.monthsAbbr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

	////////////////////////////////////////////////////////////////////////////
	// Private methods /////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////
	
	// Constructor, called only when object is created
	var init = function(){
		if(undefined!==opts){
			if(undefined!==opts.events){
				for(var i=opts.events.length; i--;){
					var hasDesc = (opts.events[i].hasOwnProperty("desc"));
					var hasDate = (opts.events[i].hasOwnProperty("date"));
					var hasStartDate = (opts.events[i].hasOwnProperty("startDate"));
					var hasEndDate = (opts.events[i].hasOwnProperty("endDate"));
					if(hasDesc && (hasDate  || (hasStartDate && hasEndDate))){
						if(hasStartDate && hasEndDate){
							if(+opts.events[i].startDate <= +opts.events[i].endDate) self.events.push(opts.events[i]);
							else console.log("Start date must occur before end date.");
						}else self.events.push(opts.events[i]);
					}else console.log("All events must have a 'desc' property and either a 'date' property or a 'startDate' and 'endDate' property");
				}
			}
			if(undefined!==opts.abbrDay) self.abbrDay = opts.abbrDay;
			if(undefined!==opts.onDayClick) self.onDayClick = opts.onDayClick;
			if(undefined!==opts.abbrMonth) self.abbrMonth = opts.abbrMonth;
			if(undefined!==opts.abbrYear) self.abbrMonth = opts.abbrYear;
			if(undefined!==opts.abbrMonth) self.abbrMonth = opts.abbrMonth;
			if(undefined!==opts.year) self.year = opts.year;
			if(undefined!==opts.month) self.month = opts.month-1;
		}
		var classes = self.elem.getAttribute("class");
		if(!classes) classes = "";
		classes += " CalendarJS";
		self.elem.setAttribute("class", classes);
		self.drawCalendar();
		self.elem.insertAdjacentHTML('afterend', "<div class='clearfix'></div>");
	};
	
	// Create a DOM element
	var makeEle = function(name, attrs){
		var ele = document.createElement(name);
		for(var i in attrs)
			if(attrs.hasOwnProperty(i))
				ele.setAttribute(i, attrs[i]);
		return ele;
	};
	
	// Attach an event handler
	var addEvent = function(el, type, handler) {
	    if (el.attachEvent) el.attachEvent('on'+type, handler); else el.addEventListener(type, handler);
	};
	
	// Remove an event handler
	var removeEvent = function(el, type, handler) {
	    if (el.detachEvent) el.detachEvent('on'+type, handler); else el.removeEventListener(type, handler);
	};
	
	// Event handler to show the next month
	var _loadNextMonth = function(){
		self.month = self.month-1>-1?self.month-1:11;
		if(self.month===11) self.year--;
		self.drawCalendar();
	};
	
	// Event handler for next month
	var _loadLastMonth = function(){
		self.month = self.month+1>11?0:self.month+1;
		if(self.month===0) self.year++;
		self.drawCalendar();
	};
	
	// Event handler for day clicked
	var _dayClicked = function(){
		var evtids = this.getAttribute('data-events').split(",");
		var evts = [];
		for(var i=0; i<evtids.length; i++) 
			if(self.events[evtids[i]]!==undefined) 
				evts.push(self.events[evtids[i]]);
		var date = new Date(self.year, self.month, this.getAttribute('data-day'));
		self.onDayClick(date, evts);
	};
	
	// Set all calendar event handlers
	var setCalendarEvents = function(){
		
		var lastLink = document.getElementsByClassName("lastLink")[0];
		removeEvent(lastLink, 'click', _loadNextMonth);
		addEvent(lastLink, 'click', _loadNextMonth);
		
		var nextLink = document.getElementsByClassName("nextLink")[0];
		removeEvent(nextLink, 'click', _loadLastMonth);
		addEvent(nextLink, 'click', _loadLastMonth);
		
		var calDays = document.getElementsByClassName("calDay");
		for(var i=calDays.length; i--;){
			removeEvent(calDays[i], 'click', _dayClicked);
			addEvent(calDays[i], 'click', _dayClicked);
		}
	};
	
	////////////////////////////////////////////////////////////////////////////
	// Public methods //////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////
	
	// Draw month calendar
	self.drawCalendar = function(){ 
		// clear the element
		self.elem.innerHTML = "";

		var firstDayofWeek = new Date(self.year, self.month, 1).getDay();
		var lastDate = new Date(self.year, self.month+1, 0).getDate();
		var currentDate = 1;
		var currentDay = 0;

		// draw title bar
		var year = self.abbrYear?"'"+self.year.substr(2,2):self.year;
		var monthArrayName = !self.abbrMonth ? "monthsFull" : "monthsAbbr";
		var monthName = self[monthArrayName][self.month];
		var lastMo = self.monthsAbbr[self.month-1]?self.monthsAbbr[self.month-1]:self.monthsAbbr[11];
		var nextMo = self.monthsAbbr[self.month+1]?self.monthsAbbr[self.month+1]:self.monthsAbbr[0];
		self.elem.insertAdjacentHTML('beforeend', "<div class='weekRow calHeader'><div class='lastLink'>&vltri; "+lastMo+"</div><div class='nextLink'>"+nextMo+" &vrtri;</div><div class='moTitle'>"+monthName+" "+year+"</div><div class='clearfix'></div></div>");

		// Draw day labels
		var dayArrayName = !self.abbrDay ? "daysOfWeekFull" : "daysOfWeekAbbr";
		var dayNames = makeEle("div", {class: "dayRow weekRow"});
		for(var i=0; i<self[dayArrayName].length; i++){ 
			var directionalClass = "";
			if(i===6) directionalClass = " right top-right";
			if(i===0) directionalClass += " top-left";
			dayNames.insertAdjacentHTML('beforeend', "<div class='dayCol left top bottom dayHeader"+directionalClass+"'><div class='dayHeaderCell'>"+self[dayArrayName][i]+"</div></div>");
		}
		self.elem.appendChild(dayNames);

		// Draw days
		while(currentDate<=lastDate){
			currentDay = 0;

			// draw a div for the week
			var week = makeEle("div", {class: "weekRow"});

			// draw days before the 1st of the month
			while(currentDate===1&&currentDay<firstDayofWeek){
				week.insertAdjacentHTML('beforeend', "<div class='dayCol blankday bottom left'><div class='dayContent'><div class='dayTable'><div class='dayCell'></div></div></div></div>");
				currentDay++;
			}

			// draw days of the month
			while(currentDay<7&&currentDate<=lastDate){

				// get events
				var evt = "";
				var evtids = [];
				for(var n=0; n<self.events.length; n++) {	
					if(!self.events[n].hasOwnProperty('date')){
						var morn = +(new Date(self.year, self.month, currentDate, 0, 0, 0));
						var night = +(new Date(self.year, self.month, currentDate, 23, 59, 59));
						
						var startsToday = (+self.events[n].startDate>=morn && +self.events[n].startDate<=night);
						var endsToday = (+self.events[n].endDate>=morn && +self.events[n].endDate<=night);
						var continuesToday = (+self.events[n].startDate<morn && +self.events[n].endDate>night);
						
						if(startsToday || endsToday || continuesToday){
							var cls = (undefined===self.events[n].type) ? "" : " "+self.events[n].type;
							var desc = self.events[n].desc;
							if(self.ellipse) desc = "<span>"+desc+"</span>", cls+=" ellipse";
							evt += "<div class='calEvent"+cls+"'>"+desc+"</div>";
							evtids.push(n);
						}
					}else{
						
						var yearMatches = (self.events[n].date.getFullYear()===self.year);
						var monthMatches = (self.events[n].date.getMonth()===self.month);
						var dayMatches = (self.events[n].date.getDate()===currentDate);
						
						if(yearMatches && monthMatches && dayMatches){
							var cls = (undefined===self.events[n].type) ? "" : " "+self.events[n].type;
							var desc = self.events[n].desc;
							if(self.ellipse) desc = "<span>"+desc+"</span>", cls+=" ellipse";
							evt += "<div class='calWrapper'><div class='calEvent"+cls+"'>"+desc+"</div></div>";
							evtids.push(n);
						}
					}
				}
				var directionalClass = "";
				if(currentDay===6) directionalClass = " right";
				if((lastDate-currentDate)<7){
					if(currentDay===0) directionalClass += " bottom-left";
					if(currentDay===6&&currentDate===lastDate) directionalClass += " bottom-right";
				} 
				// draw day
				week.insertAdjacentHTML('beforeend', "<div class='dayCol bottom left"+directionalClass+"'><div class='dayContent'><div class='dayTable'><div class='dayCell calDay' data-day='"+currentDate+"' data-events='"+(evtids.join(","))+"'><span class='dateLabel'>"+currentDate+"</span> "+evt+"</div></div></div></div>");
				currentDate++;
				currentDay++;
			}

			// draw empty days after last day of month
			var first_post_empty = true;
			while(currentDay<7){
				var directionalClass = "";
				if(first_post_empty) directionalClass = " left";
				if(currentDay===6) directionalClass += " right bottom-right";
				first_post_empty = false;
				week.insertAdjacentHTML('beforeend', "<div class='dayCol blankday bottom"+directionalClass+"'><div class='dayContent'><div class='dayTable'><div class='dayCell'></div></div></div></div>");
				currentDay++;
			}

			self.elem.appendChild(week);

		}

		setCalendarEvents();
	};

	// Call the constructor
	init();
};