
var ele = document.getElementById('cal');			

var cal = new calendar(ele, {
	disabledDates: [new Date(2016, 8, 11)],
	abbrDay: true,
	abbrMonth:true, 
	month: 9, 
	year: 2016,
	onDayClick: function(date){
		cal.clearSelection();
		cal.selectDate(date);
		console.log(date);
	}
});

cal.disableDate(new Date(2016, 9, 23));