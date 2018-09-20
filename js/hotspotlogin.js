<?php

echo "

var blur = 0;
var starttime = new Date();
var startclock = starttime.getTime();
var mytimeleft = 0;

function doTime() {
	window.setTimeout( \"doTime()\", 1000 );
	t = new Date();
	time = Math.round((t.getTime() - starttime.getTime())/1000);

	if (mytimeleft) {
		time = mytimeleft - time;

	        if (time <= 0) {
	          window.location = \"$loginpath?res=popup3&uamip=$uamip&uamport=$uamport\";
	        }
	}

	if (time < 0) time = 0;
	// No. of days
	days = ((time - (time % 3600)) / 3600) / 24 ;
	
	// will be use for Hours remaining
	var integerPart = parseInt(days);
	var decimalPart = days - integerPart;
	
	// get the no. of minutes and seconds
	hours = (time - (time % 3600)) / 3600;
	time = time - (hours * 3600);
	mins = (time - (time % 60)) / 60;
	secs = time - (mins * 60);
	
	// get the value of days
	days = parseInt(days);
	// get the value of hours
	hours = Math.floor(decimalPart * 24);
	
	if (days < 10) days = \"0\" + days;
	if (hours < 10) hours = \"0\" + hours;
	if (mins < 10) mins = \"0\" + mins;
	if (secs < 10) secs = \"0\" + secs;
	
	//Display Online Time
	title = \"Online time: \" + hours + \":\" + mins + \":\" + secs;

	// Display Remaining Time
	if (mytimeleft) {
		if(days < 1 ){
			//  Less than 1 day
			title = \"Remaining Time: \" + hours + \":\" + mins + \":\" + secs;
		} else if (days == 1){
			// Day is quals to 1
			title = \"Remaining Time: \" + days + \" Day: \" + hours + \":\" + mins + \":\" + secs;
		} else {
			// Display days grater than 1
			title = \"Remaining Time: \" + days + \" Days: \" + hours + \":\" + mins + \":\" + secs;
		}	
	}

	if (document.all || document.getElementById) {
		//console.log(title) ;
		//$timer=title;
		document.title = title;
		document.getElementById('timer').innerHTML= title;
	} else {
		self.status = title;
		
	}

}

function popUp(URL) {
	if (self.name != \"chillispot_popup\") {
		chillispot_popup = window.open(URL,'chillispot_popup','toolbar=0,scrollbars=0,location=0,statusbar=0,menubar=0,resizable=0,width=500,height=375');
	}
}

function doOnLoad(result, URL, userurl, redirurl, timeleft,reply) {
	if (timeleft) {
		mytimeleft = timeleft;
	}

	if ((result == 1) && (self.name == \"chillispot_popup\")) {
		doTime();
	}

	if ((result == 1) && (self.name != \"chillispot_popup\")) {
		chillispot_popup = window.open(URL,'chillispot_popup','toolbar=0,scrollbars=0,location=0,statusbar=0,menubar=0,resizable=0,width=500,height=375');
	}

	if ((result == 2) || result == 5) {
		document.form1.UserName.focus()
	}

	if ((result == 2) && (self.name != \"chillispot_popup\")) {
		chillispot_popup = window.open('','chillispot_popup','toolbar=0,scrollbars=0,location=0,statusbar=0,menubar=0,resizable=0,width=400,height=200');
		chillispot_popup.close();
	}

	if ((result == 12) && (self.name == \"chillispot_popup\")) {
		
		doTime();

		if (redirurl) {
			opener.location = redirurl;
		} else if (opener.home) {
			opener.home();
		} else {
			opener.location = \"about:home\";
		}

		self.focus();
		blur = 0;
	}


	if ((result == 13) && (self.name == \"chillispot_popup\")) {
		self.focus();
		blur = 1;
	}
	
	// added code by wens to dispay the alert status of login
	if(result == 2){
        
        if(reply){
            var str1; 
            str1 =        \"   * Sorry! Your've reached maximum time limit * \\n\";
            str1 = str1 + \"    - Pls. buy new PisoWIFI load to access the Internet- \";
            alert(str1);
        } else{
            
            alert('* Sorry! Invalid Username or Password *');
        }
	}
			    
}


function doOnBlur(result) {
	if ((result == 12) && (self.name == \"chillispot_popup\")) {
		if (blur == 0) {
			blur = 1;
			self.focus();
	        }
	}
}



";

?>
