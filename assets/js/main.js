(function(){
	var div = document.getElementById('cal3');
	var cal = new calendar(div, {
		year: 2019,
		month: 6,
		events: [{
			desc: 'Bonnaroo',
			startDate: new Date(2019, 5, 13),
			endDate: new Date(2019, 5, 16)
		}]
	});
})();

(function(){
	var input = document.getElementById('date-picker');
	var div = document.getElementById('cal1');
	var cal = new calendar(div, {
		onDayClick: function(date){
			input.value = date.toLocaleDateString();
			cal.clearSelection(date);
			cal.selectDate(date);
			div.style.display= 'none';
		}
	});
	input.addEventListener('focus', function(){
		div.style.display= 'block';
	});
})();

(function(){
	var startinput = document.getElementById('date-range-picker-start');
	var endinput = document.getElementById('date-range-picker-end');
	var div = document.getElementById('cal2');
	var start_date, end_date;
	var cal = new calendar(div, {
		onDayClick: function(date){
			if(start_date && end_date){ 
				cal.clearSelection(date);
				start_date = end_date = null;
			}else if(start_date){
				cal.clearSelection(date);
				cal.selectDateRange(start_date, date);
				end_date = date;
				endinput.value = date.toLocaleDateString();
			}else{
				cal.selectDate(date);
				start_date = date;
				startinput.value = date.toLocaleDateString();
			}
		}
	});
})();


var orig_colors = {
	'--cal-evt-color': 'rgba(0, 153, 153, .4)',
	'--cal-light-color': 'rgba(184, 230, 255, 1)',
	'--cal-med-light-color': 'rgba(159, 221, 255, 1)',
	'--cal-med-dark-color': 'rgba(127, 210, 255, 1)',
	'--cal-dark-color': 'rgba(44, 126, 170, 1)',
	'--cal-black-color': 'rgba(33, 33, 33, 1)',
	'--cal-active-color': 'rgba(127, 210, 255, 1)',
	'--cal-button-bg-color': 'rgba(184, 230, 255, 1)'
};

var colors = {};
Object.keys(orig_colors).forEach(k=>{
	colors[k] = orig_colors[k];
});

$("#reset-all").click(()=>{
	var functs = ['spin', 'saturate', 'brightness'];
	Object.keys(orig_colors).forEach(k=>{
		colors[k] = orig_colors[k];
		$("#"+k).val(colors[k]);
		functs.forEach(f=>{
			$("#"+k+"-"+f).val(0);
		});
		setColor(k);
	});
	functs.forEach(f=>{
		$("#master-"+f).val(0);
	});
	setColors();
});

$('#master-spin').on('input', function(e){
	Object.keys(colors).forEach(k=>{
		spinColor(k, this.value);
	});
	setColors();
});
$('#master-saturate').on('input', function(e){
	Object.keys(colors).forEach(k=>{
		saturateColor(k, this.value);
	});
	setColors();
});
$('#master-brightness').on('input', function(e){
	Object.keys(colors).forEach(k=>{
		brightenColor(k, this.value);
	});
	setColors();
});

Object.keys(colors).forEach(key=>{
	$("#"+key).on('change blur', function(e){
		this.jscolor.hide();
		setTimeout(()=>{
			var color = tinycolor(this.value);
			if(!color.isValid()) color = tinycolor(colors[key]);
			colors[key] = color.toRgbString();
			setColor(key);
			setColors();
		}, 50);
	});
	$("#"+key+"-spin").on('input', function(e){
		spinColor(key, this.value);
		setColor(key);
		setColors();
	});
	$("#"+key+"-saturate").on('input', function(e){
		saturateColor(key, this.value);
		setColor(key);
		setColors();
	});
	$("#"+key+"-brightness").on('input', function(e){
		brightenColor(key, this.value);
		setColor(key);
		setColors();
	});
	$("#"+key+"-reset").on('click', function(e){
		var functs = ['spin', 'saturate', 'brightness'];
		colors[key] = orig_colors[key];
		$("#"+key).val(colors[key]);
		functs.forEach(f=>{
			$("#"+key+"-"+f).val(0);
		});
		setColor(key);
		setColors();
	});
});

$("#all-color").on('change blur', function(e){
	this.jscolor.hide();
	setTimeout(()=>{
		var hue = tinycolor(this.value);
		if(!hue.isValid()){
			this.value = '';
			return;
		}
		this.value = tinycolor(this.value).toRgbString();
		hue = hue.toHsl().h;
		var scheme = new ColorScheme;
		scheme.from_hue(hue).scheme('contrast').variation('default');
		var c = scheme.colors();
		colors['--cal-evt-color'] = tinycolor('#'+c[6]).toRgbString();
		colors['--cal-light-color'] = tinycolor('#'+c[2]).toRgbString();
		colors['--cal-med-light-color'] = tinycolor('#'+c[3]).toRgbString();
		colors['--cal-med-dark-color'] = tinycolor('#'+c[0]).toRgbString();
		colors['--cal-active-color'] = tinycolor('#'+c[0]).toRgbString();
		colors['--cal-dark-color'] = tinycolor('#'+c[1]).toRgbString();
		colors['--cal-button-bg-color'] = tinycolor('#'+c[3]).toRgbString();
		var functs = ['spin', 'saturate', 'brightness'];
		Object.keys(colors).forEach(k=>{
			$("#"+k).val(colors[k]);
			functs.forEach(f=>{
				$("#"+k+"-"+f).val(0);
			});
			setColor(k);
		});
		functs.forEach(f=>{
			$("#master-"+f).val(0);
		});
		setColors();
	}, 50);					
});

Object.keys(orig_colors).forEach(setColor);
drawCalendar();
setColors();

function setColor(key){
	$("#"+key).val(colors[key]);
	$("#"+key).parent().parent().parent().parent().css('background-color', colors[key]);
}

function saturateColor(key, saturation){
	saturation = +saturation;
	var funct = saturation > 0 ? 'saturate' : 'desaturate';
	var level = Math.abs(saturation);
	colors[key] = tinycolor(colors[key])[funct](level).toRgbString();
	setColor(key);
}

function brightenColor(key, brightness){
	brightness = +brightness;
	var funct = brightness > 0 ? 'brighten' : 'darken';
	var level = Math.abs(brightness);
	colors[key] = tinycolor(colors[key])[funct](level).toRgbString();
	setColor(key);
}

function spinColor(key, spin){
	colors[key] = tinycolor(colors[key]).spin(+spin).toRgbString();
	setColor(key);
}

function setColors(){
	var style = document.getElementById('custom-styles');
	var css = `
	:root {
		--cal-light-color: ${colors['--cal-light-color']};
		--cal-med-light-color: ${colors['--cal-med-light-color']};
		--cal-med-dark-color: ${colors['--cal-med-dark-color']};
		--cal-dark-color: ${colors['--cal-dark-color']};
		--cal-black-color: ${colors['--cal-black-color']};
		--cal-evt-color: ${colors['--cal-evt-color']};
		--cal-active-color: ${colors['--cal-active-color']};
		--cal-button-bg-color: ${colors['--cal-button-bg-color']};
	}

	.cjs-dayCol{
		background-color: var(--cal-light-color);
	}

	.cjs-dayHeader{
		background-color: var(--cal-light-color);
		color: var(--cal-dark-color);
	}

	.cjs-active{
		background: var(--cal-active-color);
		border-color: var(--cal-light-color);
	}

	.cjs-blankday{
		background-color: var(--cal-med-light-color);
	}

	.cjs-lastLink{
		background: var(--cal-button-bg-color);
		color: var(--cal-dark-color);
		border: 1px solid var(--cal-med-dark-color);
	}

	.cjs-nextLink{
		background: var(--cal-button-bg-color);
		color: var(--cal-dark-color);
		border: 1px solid var(--cal-med-dark-color);
	}

	.cjs-calDay:hover{
		background: var(--cal-med-light-color);
	}

	.cjs-right{
		border-right: 1px solid var(--cal-med-dark-color);
	}

	.cjs-top{
		border-top: 1px solid var(--cal-med-dark-color);
	}

	.cjs-left{
		border-left: 1px solid var(--cal-med-dark-color);
	}

	.cjs-bottom{
		border-bottom: 1px solid var(--cal-med-dark-color);
	}

	.cjs-otherEvents{
		background: var(--cal-med-dark-color);
		color: var(--cal-black-color);
	}

	.cjs-calHeader{
		color: var(--cal-dark-color);
	}

	.cjs-dayContent{
		color: var(--cal-dark-color);
	}

	.cjs-calEvent{
		background: var(--cal-evt-color);
		color: var(--cal-black-color);
	}`;
	var styles = document.createTextNode(css);
	while (style.lastChild) style.removeChild(style.lastChild);
	style.appendChild(styles);
	$("#styles").val(css.replace(/\s\s+/g, ' '));
}

function drawCalendar(){
	var cal = null;
	var ele = document.getElementById('cal');			
	var opts = {
		events: [{date: new Date(2016, 8, 11), desc:"My Birthday!"}],
		abbrDay: true,
		abbrMonth:true, 
		month: 9, 
		year: 2016,
		onDayClick: function(date){cal.selectDate(date);},
		onEventClick: function(event){alert(event.desc);},
		onMonthChanged: function(m, y){ console.log(m, y); }
	};
	cal = new calendar(ele, opts);
}	