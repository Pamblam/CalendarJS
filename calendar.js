

(function($) {

    // the main function that is instatiated 
    // upon each element in the group
    function calendar(elem, opts) {
        var self = this;
        self.elem = elem;
		self.abbrDay = false;
		self.abbrMonth = false;
		self.abbrYear = false;
		self.onDayClick = function(){};
		self.events = [];
		
		self.month = (new Date()).getMonth();
		self.year = (new Date()).getFullYear();
		
		self.daysOfWeekFull = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
		self.daysOfWeekAbbr = ["Sun", "Mon", "Tues", "Wedns", "Thurs", "Fri", "Sat"];
		self.monthsFull = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
		self.monthsAbbr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
		
		self.init = function(){
			if(undefined!==opts.events) self.events = opts.events;
			if(undefined!==opts.abbrDay) self.abbrDay = opts.abbrDay;
			if(undefined!==opts.onDayClick) self.onDayClick = opts.onDayClick;
			if(undefined!==opts.abbrMonth) self.abbrMonth = opts.abbrMonth;
			if(undefined!==opts.abbrYear) self.abbrMonth = opts.abbrYear;
			if(undefined!==opts.abbrMonth) self.abbrMonth = opts.abbrMonth;
			if(undefined!==opts.year) self.year = opts.year;
			if(undefined!==opts.month) self.month = opts.month-1;
			self.drawCalendar();
		};
		
		self.drawCalendar = function(){ 
			// clear the element
			$(self.elem).empty();
			
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
			$(self.elem).append("<div class='weekRow calHeader'><div class='lastLink'>"+lastMo+"</div><div class='nextLink'>"+nextMo+"</div><div class='moTitle'>"+monthName+" "+year+"</div><div class='clearfix'></div></div>");
			
			// Draw day labels
			var dayArrayName = !self.abbrDay ? "daysOfWeekFull" : "monthsAbbr";
			var $dayNames = $("<div class='dayRow weekRow' />");
			for(var i=0; i<self[dayArrayName].length; i++) $dayNames.append("<div class='dayCol dayHeader'><div class='dayHeaderCell'>"+self[dayArrayName][i]+"</div></div>");
			$(self.elem).append($dayNames);
			
			// Draw days
			while(currentDate<=lastDate){
				currentDay = 0;
				
				// draw a div for the week
				var $week = $("<div class='weekRow' />");
				
				// draw days before the 1st of the month
				while(currentDate===1&&currentDay<firstDayofWeek){
					$week.append("<div class='dayCol blankday'><div class='dayContent'><div class='dayTable'><div class='dayCell'></div></div></div></div>");
					currentDay++;
				}
				
				// draw days of the month
				while(currentDay<7&&currentDate<=lastDate){
					// get events
					var evt = "";
					for(var n=0; n<self.events.length; n--) if(self.events[n].date.getFullYear()===self.year&&self.events[n].date.getMonth===self.month&&self.events[n].date.getDate===currentDate)
						evt += "<div>"+self.events[n]+"</div>";
					$week.append("<div class='dayCol'><div class='dayContent'><div class='dayTable'><div class='dayCell calDay' data-day='"+currentDate+"'>"+currentDate+" "+evt+"</div></div></div></div>");
					currentDate++;
					currentDay++;
				}
				
				// draw empty days after last day of month
				while(currentDay<7){
					$week.append("<div class='dayCol blankday'><div class='dayContent'><div class='dayTable'><div class='dayCell'></div></div></div></div>");
					currentDay++;
				}
				
				$(self.elem).append($week);
				
			}
			
			self.setCalendarEvents();
		};
		
		self.setCalendarEvents = function(){
			$(self.elem).find(".lastLink").off("click").click(function(){
				self.month = self.month-1>-1?self.month-1:11;
				if(self.month===11) self.year--;
				self.drawCalendar();
			});
			$(self.elem).find(".nextLink").off("click").click(function(){
				self.month = self.month+1>11?0:self.month+1;
				if(self.month===0) self.year++;
				self.drawCalendar();
			});
			$(self.elem).find(".calDay").off("click").click(function(){
				var date = new Date(self.year, self.month, $(this).data('day'));
				self.onDayClick(date);
			});
		};
		
        self.init();
    }

    // throw it all on top of the jQuery object.
    $.fn.calendar = function(p, pp) {
		if(this.length === 1 && typeof p === "string" && $(this[0]).data('calInstance') !== 'undefined'){
			if(undefined === pp)
				return $(this[0]).data('calInstance')[p]();
			else
				return $(this[0]).data('calInstance')[p](pp);
		}else{
			return this.each(function() {
				params = typeof p === 'object' ? p : {};
				if (typeof $(this).data('calInstance') === 'undefined')
					$(this).data('calInstance', new calendar(this, params));
			});
		}
    };

})(jQuery);