var cal = null;
var ele = document.getElementById('cal');			
var opts = {
	events: [{date: new Date(2016, 8, 11), desc:"My Birthday!"}],
	abbrDay: true,
	abbrMonth:true, 
	month: 9, 
	year: 2016,
	onDayClick: function(date){cal.selectDate(date);},
	onEventClick: function(event){alert(event.desc);}
};
cal = new calendar(ele, opts);