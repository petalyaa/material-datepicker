# Material Datepicker #
Javascript datepicker inspired  by Google material design.

### Description ###
Javascript datepicker inspired  by Google material design. Simple and easy to
use the library. Just include the js and css file and use it. I've build this
to use with my current project and here I share the source code. This is build 
on plain javascript. 

### Dependencies ###
* font-awesome
* roboto-fontface (Optional) - This is only to give the datepicker more material look with the roboto font.

### Usage ###
Include these two css files in your page.

```html
<!-- REQUIRED -->
<link rel="stylesheet" href="bower_components/font-awesome/css/font-awesome.css">
<link rel="stylesheet" href="bower_components/material-datepicker/css/material-datepicker.css">

<!-- OPTIONAL -->
<link rel="stylesheet" href="bower_components/roboto-fontface/css/roboto-fontface.css">

<!-- REQUIRED -->
<script type="text/javascript" src="bower_components/material-datepicker/js/material-datepicker.js"></script>
```

Now that you already load all the required file, you can start using the datepicker anywhere in your code.

For example :
```javascript
var datepicker = new MaterialDatepicker(); // Initialize the datepicker
var button = document.getElementById("trigger_button");
button.onclick = function(){
	// Show the datepicker
	buttonMaterialDatepicker.show({
		onDateSelected : onDateSelected, // Callback when date is selected
		initialDate : new Date(2016, 4, 1) // initial date to show
	});
};
function onDateSelected(date) {
	// Do something with the 'date' object
}
```

### Screenshots ###
![alt tag](https://raw.githubusercontent.com/petalyaa/material-datepicker/master/screenshots/1.png)

### Issues ###
* Not responsive (Now only support desktop view)
* Only landscape datepicker supported. (portrait view still under development)

### License ###
```
The MIT License (MIT)

Copyright (c) 2016 Mohd Khairul Ikhwan bin Kamarudin

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```