/**
 * Material datepicker class for javascript.
 * This is inspired by google material datepicker.
 * 
 *	The MIT License (MIT)
 *	
 *	Copyright (c) 2016 Mohd Khairul Ikhwan bin Kamarudin
 *	
 *	Permission is hereby granted, free of charge, to any person obtaining a copy of 
 *	this software and associated documentation files (the "Software"), to deal in the 
 *	Software without restriction, including without limitation the rights to use, copy, 
 *	modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, 
 *	and to permit persons to whom the Software is furnished to do so, subject to the 
 *	following conditions:
 *	
 *	The above copyright notice and this permission notice shall be included in all 
 *	copies or substantial portions of the Software.
 *	
 *	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, 
 *	INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A 
 *	PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT 
 *	HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF 
 *	CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE 
 *	OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 * 
 * @author 	Khairul
 * @date	30/05/2016
 */

MaterialDatepicker.prototype.constructor = MaterialDatepicker;

Object.prototype.extend = function(obj) {
    for (var i in obj) {
    	this[i] = obj[i];
    }
    return this;
 };

function MaterialDatepicker(o) {
	var defaultOptions = {
		orientation : 'potrait',
		debugMode : false,
		closeOnBlur : true	
	};
	this.initialDayName = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
	this.shortDayName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
	this.monthName = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	this.longMonthName = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	this.initialDate = new Date();
	this.isVisible = false;
	this.calendarYearHeader = null;
	this.calendarDateHolder = null;
	this.overlay = null;
	this.currentActiveView = 'date';
	this.linkItemPrefixId = this.generateRandomId();
	this.onDateSelectedCallback = null;
	this.options = defaultOptions.extend(o);
	this.init();
}

MaterialDatepicker.prototype.generateRandomId = function(){
	var text = 'material_datepicker_item_' + getRandomText() + "_" + getRandomNumber() + "_";

	function getRandomText() {
		var s = '';
		var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
		for( var i=0; i < 5; i++ )
			s += possible.charAt(Math.floor(Math.random() * possible.length));
		return s;
	}
	
	function getRandomNumber() {
		return Math.floor((Math.random() * 99999) + 10000);
	}
	
	return text;
};

MaterialDatepicker.prototype.init = function(){
	this.log('Initializing material datepicker...');
	this.draw();
};

MaterialDatepicker.prototype.draw = function(){
	var parentThis = this;
	var body = document.body;
	var isClickOnDatepicker = false;
	var overlay = document.createElement("div");
	var orientation = this.options.orientation;
	var orientationClass = null;
	var datepicker = document.createElement("div");
	if(orientation == 'landscape') {
		orientationClass = 'datepicker_landscape';
		renderLandscapeDatepicker();
	} else {
		orientationClass = 'datepicker_potrait';
	}
	datepicker.className = 'material_datepicker_container material_datepicker_hide ' + orientationClass;
	overlay.className = 'material_datepicker_overlay material_datepicker_overlay_hide';
	overlay.appendChild(datepicker);
	body.appendChild(overlay);
	
	datepicker.onclick = function(e){
		isClickOnDatepicker = true;
		e.preventDefault();
		return false;
	};
	
	if(this.options.closeOnBlur) overlay.onclick = function(){
		if(!isClickOnDatepicker) {
			parentThis.hide();
		}
		isClickOnDatepicker = false;
	};
	
	this.orientationClass = orientationClass;
	this.overlay = overlay;
	this.datepicker = datepicker;
	
	function renderLandscapeDatepicker() {
		var landscapeHeader = document.createElement('div');
		var landscapeContent = document.createElement('div');
		var normalDateView = document.createElement('div');
		var yearView = document.createElement('div');
		normalDateView.style.display = 'none';
		yearView.style.display = 'none';
		landscapeHeader.className = 'landscape_header';
		landscapeContent.className = 'landscape_content';
		
		// Left section for header
		var landscapeHeaderContent = document.createElement('div');
		var year = document.createElement('div');
		var date = document.createElement('div');
		
		year.className = 'year datepicker_label_inactive';
		date.className = 'date datepicker_label_inactive';
		landscapeHeaderContent.className = 'landscape_header_content';
		year.onclick = function(){
			year.className = 'year datepicker_label_active';
			date.className = 'date datepicker_label_inactive';
			normalDateView.style.display = 'none';
			yearView.style.display = 'block';
			var initYear = parentThis.initialDate.getFullYear();
			initYear = initYear - 3;
			var scrollYearLi = document.getElementById(parentThis.linkItemPrefixId + initYear);
			if(scrollYearLi && scrollYearLi != null)
				scrollYearLi.scrollIntoView();
			parentThis.currentActiveView = 'year';
		};
		date.onclick = function(){
			year.className = 'year datepicker_label_inactive';
			date.className = 'date datepicker_label_active';
			normalDateView.style.display = 'block';
			yearView.style.display = 'none';
			parentThis.currentActiveView = 'date';
		};
		parentThis.dateLabel = date;
		parentThis.yearLabel = year;
		landscapeHeaderContent.appendChild(year);
		landscapeHeaderContent.appendChild(date);
		landscapeHeader.appendChild(landscapeHeaderContent);
		datepicker.appendChild(landscapeHeader);
		
		// Top content section for date
		var dateViewYearSection = document.createElement('div');
		var arrowLeft = document.createElement('div');
		var dateViewYearLabel = document.createElement('div');
		var arrowRight = document.createElement('div');
		var dateViewYearLabelContainer = document.createElement('div');
		dateViewYearSection.className = 'date_view_year_section';
		arrowLeft.className = 'year_section_left_arrow';
		arrowRight.className = 'year_section_right_arrow';
		dateViewYearLabel.className = 'date_view_year_label';
		dateViewYearLabelContainer.className = 'date_view_year_label_container';
		dateViewYearLabel.appendChild(dateViewYearLabelContainer);
		parentThis.calendarYearHeader = dateViewYearLabelContainer;
		arrowLeft.appendChild(getLeftArrow());
		arrowRight.appendChild(getRightArrow());
		dateViewYearSection.appendChild(arrowLeft);
		dateViewYearSection.appendChild(dateViewYearLabel);
		dateViewYearSection.appendChild(arrowRight);
		normalDateView.appendChild(dateViewYearSection);
		
		// Calendar content
		var calendar = document.createElement('div');
		var initialDay = parentThis.initialDayName;
		calendar.className = 'datepicker_calendar';
		for(var i = 0; i < initialDay.length; i++) {
			var span = document.createElement('span');
			span.className = 'day_header_label';
			span.innerHTML = initialDay[i];
			calendar.appendChild(span);
		}
		var clearDiv = document.createElement('div');
		clearDiv.className = 'clearfix';
		calendar.appendChild(clearDiv);
		normalDateView.appendChild(calendar);
		
		var calendarDateHolder = document.createElement('div');
		
		parentThis.calendarDateHolder = calendarDateHolder;
		calendar.appendChild(calendarDateHolder);
		
		yearView.appendChild(generateYearView());
		
		landscapeContent.appendChild(normalDateView);
		landscapeContent.appendChild(yearView);
		
		// Action section (ok button, cancel button)
		var action = document.createElement('div');
		action.className = 'action';
		var cancelBtn = document.createElement('button');
		cancelBtn.innerHTML = 'CANCEL';
		cancelBtn.className = 'datepicker-btn datepicker-btn-link ripple';
		cancelBtn.onclick = function(){
			onCancel();
		};
		action.appendChild(cancelBtn);
		var okBtn = document.createElement('button');
		okBtn.innerHTML = 'OK';
		okBtn.className = 'datepicker-btn datepicker-btn-link ripple';
		okBtn.onclick = function(){
			onOKClick();
		};
		action.appendChild(okBtn);
		
		landscapeContent.appendChild(action);
		datepicker.appendChild(landscapeContent);
	}
	
	function generateYearView() {
		var div = document.createElement('div');
		div.className = 'landscape_year_view';
		var ul = document.createElement('ul');
		var startYear = 1900;
		var endYear = 2100;
		var initYear = parentThis.initialDate.getFullYear();
		for(var i = startYear; i <= endYear; i++) {
			var li = document.createElement('li');
			li.style['list-style-type'] = 'none';
			var a = document.createElement('a');
			a.href = '#';
			a.setAttribute('data-year', i);
			a.setAttribute('id', parentThis.linkItemPrefixId + i);
			a.innerHTML = i;
			li.appendChild(a);
			var activeClass = '';
			if(initYear == i) {
				activeClass = 'active';
			}
			li.className = 'year_list_item ' + activeClass;
			ul.appendChild(li);
			a.onclick = onYearSelected;
		}
		div.appendChild(ul);
		return div
	}
	
	function onYearSelected() {
		var li = this.parentElement;
		var ul = li.parentElement;
		var year = this.getAttribute('data-year');
		var allLi = ul.childNodes;
		if(allLi && allLi != null && allLi.length > 0) {
			for(var i = 0; i < allLi.length; i++) {
				allLi[i].className = 'year_list_item';
			}
		}
		li.className = 'year_list_item active';
		var date = parentThis.initialDate;
		var selectedDate = parentThis.selectedDate;
		date.setFullYear(year);
		selectedDate.setFullYear(year);
		parentThis.renderCalendar(date, selectedDate);
		parentThis.populateHeaderContent(selectedDate);
	}
	
	function getLeftArrow() {
		var a = document.createElement('a');
		var i = document.createElement('i');
		a.href = '#';
		a.className = 'datepicker-btn datepicker-btn-link arrow_ripple arrow_button';
		a.style.padding = '0';
		i.className = 'fa fa-angle-left';
		i.style['font-weight'] = '700';
		a.appendChild(i);
		a.onclick = onLeftArrowClick;
		return a;
	}
	
	function getRightArrow() {
		var a = document.createElement('button');
		var i = document.createElement('i');
		a.href = '#';
		a.className = 'datepicker-btn datepicker-btn-link arrow_ripple arrow_button';
		a.style.padding = '0';
		i.className = 'fa fa-angle-right';
		i.style['font-weight'] = '700';
		a.appendChild(i);
		a.onclick = onRightArrowClick;
		return a;
	}
	
	function onRightArrowClick() {
		var date = parentThis.initialDate;
		date.setDate(1);
		date.setMonth(date.getMonth() + 1);
		parentThis.renderCalendar(date, parentThis.selectedDate);
	}
	
	function onLeftArrowClick() {
		var date = parentThis.initialDate;
		date.setDate(1);
		date.setMonth(date.getMonth() - 1);
		parentThis.renderCalendar(date, parentThis.selectedDate);
	}
	
	function onCancel() {
		parentThis.hide();
	}
	
	function onOKClick() {
		var callback = parentThis.onDateSelectedCallback;
		if(callback) {
			callback(parentThis.selectedDate);
		}
		parentThis.hide();
	}
};

MaterialDatepicker.prototype.log = function(msg) {
	if(this.options.debugMode) console.log(msg);
};

MaterialDatepicker.prototype.printOptions = function() {
	for (var i in this.options) this.log(i + ' => ' + this.options[i]);
};

MaterialDatepicker.prototype.renderCalendar = function(date, selectedDate) {
	var parentThis = this;
	var monthLabel = parentThis.longMonthName[date.getMonth()];
	this.calendarYearHeader.innerHTML = monthLabel + ' ' + date.getFullYear();
	var dateHolder = parentThis.calendarDateHolder;
	dateHolder.innerHTML = '';
	
	var month = date.getMonth();
	var year = date.getFullYear();
	
	var selected = null;
	if(typeof selectedDate != 'undefined' && selectedDate != null) {
		var selMonth = selectedDate.getMonth();
		var selYear = selectedDate.getFullYear();
		if(month == selMonth && year == selYear) {
			selected = selectedDate.getDate();
		}
	}
	
	this.initialDate = date;
	var startDate = new Date(year, month, 1);
	var totalDays = daysInMonth(month, year);
	var totalBlock = totalDays + startDate.getDay();
	for(var i = 0; i < startDate.getDay(); i++) { // Append empty space if current month's day not start at sunday
		var span = document.createElement('span');
		span.className = 'date_block';
		dateHolder.appendChild(span);
	}
	for(var i = 1; i <= totalDays; i++) {
		var span = document.createElement('span');
		var textColor = '#000';
		var dateBlockCursor = 'date_block_cursor_inactive';
		span.setAttribute('data-is-active', "false");
		span.setAttribute('data-full-year', year);
		span.setAttribute('data-month', month);
		span.setAttribute('data-date', i);
		if(selected != null && selected == i) {
			var selectedBg = document.createElement('span');
			selectedBg.className = 'date_block_selected';
			span.appendChild(selectedBg);
			span.setAttribute('data-is-active', "true");
			textColor = '#FFF';
			dateBlockCursor = 'date_block_cursor_active';
			parentThis.selectedBlock = span;
			var sel = new Date(year, month, i);
			parentThis.selectedDate = sel;
		}
		
		var hoverElem = document.createElement('span');
		hoverElem.className = 'hover_handler date_block_hover_out';
		span.appendChild(hoverElem);
		span.onmouseover = function(){
			var isActive = this.getAttribute('data-is-active');
			if(isActive == 'true') return;
			var hE = this.getElementsByClassName('hover_handler');
			var hTE = this.getElementsByClassName('hover_text_handler');
			if(hE[0] && hTE[0]) {
				hE[0].className = 'hover_handler date_block_hover_in';
				hTE[0].style.color = '#fff';
			}
		};
		span.onmouseout = function(){
			var isActive = this.getAttribute('data-is-active');
			if(isActive == 'true') return;
			var hE = this.getElementsByClassName('hover_handler');
			var hTE = this.getElementsByClassName('hover_text_handler');
			if(hE[0] && hTE[0]) {
				hE[0].className = 'hover_handler date_block_hover_out';
				hTE[0].style.color = '#000';
			}
		};
		span.onclick = onDateBlockClick;
		
		var text = document.createElement('span');
		text.style.position = 'relative';
		text.style.color = textColor;
		text.className = 'hover_text_handler';
		text.innerHTML = i;
		span.appendChild(text);
		span.className = 'date_block ' + dateBlockCursor;
		dateHolder.appendChild(span);
	}
	
	function onDateBlockClick(e) {
		var isActive = this.getAttribute('data-is-active');
		if(isActive == 'true') return;
		var clickedSpan = this;
		var currentlySelectedBlock = parentThis.selectedBlock;
		if(currentlySelectedBlock != null) {
			var handler = currentlySelectedBlock.getElementsByClassName('date_block_selected');
			var textHandler = currentlySelectedBlock.getElementsByClassName('hover_text_handler');
			handler[0].className = 'hover_handler date_block_hover_out';
			textHandler[0].style.color = 'rgba(0,0,0,1)';
			currentlySelectedBlock.className = 'date_block date_block_cursor_inactive';
			currentlySelectedBlock.setAttribute('data-is-active', "false");
		}
		clickedSpan.setAttribute('data-is-active', "true");
		clickedSpan.className = 'date_block date_block_cursor_active';
		var clickSpanHandler = clickedSpan.getElementsByClassName('hover_handler');
		var clickSpanTextHandler = clickedSpan.getElementsByClassName('hover_text_handler');
		clickSpanHandler[0].className = 'date_block_selected';
		clickSpanTextHandler[0].style.color = '#FFF';
		parentThis.selectedBlock = clickedSpan;
		var date = new Date(clickedSpan.getAttribute("data-full-year"), clickedSpan.getAttribute("data-month"), clickedSpan.getAttribute("data-date"));
		parentThis.populateHeaderContent(date);
		parentThis.selectedDate = date;
	}
	
	function daysInMonth(m, y) {
		return new Date(y, m+1, 0).getDate();
	}
}

MaterialDatepicker.prototype.populateHeaderContent = function(date){
	var parentThis = this;
	var dayLabel = parentThis.shortDayName[date.getDay()];
	var monthLabel = parentThis.monthName[date.getMonth()];
	var dateLabel = date.getDate();
	var currentHeaderDate = parentThis.currentHeaderDate;
	var dateLabelElem = parentThis.dateLabel;
	var currentActiveView = parentThis.currentActiveView;
	var dateActiveClass = 'datepicker_label_inactive';
	if(currentActiveView == 'date')
		dateActiveClass = 'datepicker_label_active';
	if(currentHeaderDate && currentHeaderDate != null) {
		var currentYear = currentHeaderDate.getFullYear();
		var selectedYear = date.getFullYear();
		if(currentHeaderDate > date) {
			dateLabelElem.className = 'date ' + dateActiveClass + ' date_hide_down';
			var transitionEvent = parentThis.whichTransitionEvent();
			transitionEvent && dateLabelElem.addEventListener(transitionEvent, function() {
				dateLabelElem.className = 'date ' + dateActiveClass + ' date_show_up';
				write();
			});
		} else {
			dateLabelElem.className = 'date ' + dateActiveClass + ' date_hide_up';
			var transitionEvent = parentThis.whichTransitionEvent();
			transitionEvent && dateLabelElem.addEventListener(transitionEvent, function() {
				dateLabelElem.className = 'date ' + dateActiveClass + ' date_show_down';
				write();
			});
		}
	} else {
		write();
	}
	
	function write() {
		parentThis.currentHeaderDate = date;
		parentThis.yearLabel.innerHTML = date.getFullYear();
		parentThis.dateLabel.innerHTML = dayLabel + ',<br /> ' + monthLabel + ' ' + dateLabel;
	}
	
};

MaterialDatepicker.prototype.whichTransitionEvent = function(){
    var t;
    var el = document.createElement('fakeelement');
    var transitions = {
      'transition':'transitionend',
      'OTransition':'oTransitionEnd',
      'MozTransition':'transitionend',
      'WebkitTransition':'webkitTransitionEnd'
    }
    for(t in transitions){
        if( el.style[t] !== undefined ){
            return transitions[t];
        }
    }
};

MaterialDatepicker.prototype.renderContent = function(){
	var parentThis = this;
	var displayDate = getDisplayDate();
	this.populateHeaderContent(displayDate);
	this.renderCalendar(displayDate, displayDate);
	function getDisplayDate() {
		return parentThis.initialDate;
	}
};

MaterialDatepicker.prototype.hide = function(){
	if(this.isVisible) {
		var parentThis = this;
		parentThis.log('Hiding datepicker...');
		parentThis.datepicker.className = 'material_datepicker_container ' + parentThis.orientationClass + ' material_datepicker_hide';
		var transEnd = function(){
			parentThis.overlay.className = 'material_datepicker_overlay material_datepicker_overlay_hide';
			parentThis.datepicker.removeEventListener('transitionend', transEnd);
		};
		parentThis.datepicker.addEventListener('transitionend', transEnd, false);
		parentThis.isVisible = false;
	}
	
};

MaterialDatepicker.prototype.isValidDate = function(d){
	var isValid = false;
	if (Object.prototype.toString.call(d) === "[object Date]") {
		if (isNaN(d.getTime())) {
			isValid = false;
		} else {
			isValid = true;
		}
	} else {
		isValid = false;
	}
	return isValid;
};

MaterialDatepicker.prototype.show = function(opts){
	if(!this.isVisible) {
		this.log('Showing datepicker...');
		if(opts && opts != null) {
			var callback = opts.onDateSelected;
			var initialDate = opts.initialDate;
			if(callback) this.onDateSelectedCallback = callback;
			if(initialDate && initialDate != null && this.isValidDate(initialDate)) {
				this.initialDate = initialDate;
			}
		}
		
		this.renderContent();
		this.dateLabel.click();
		this.overlay.className = 'material_datepicker_overlay material_datepicker_overlay_show';
		this.datepicker.className = 'material_datepicker_container ' + this.orientationClass + ' material_datepicker_show';
		this.isVisible = true;
	}
};
