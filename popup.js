// Registers my github repo location with CODE2040
function register() {
	var xml = new XMLHttpRequest();
	var url = 'http://challenge.code2040.org/api/register';

	xml.onreadystatechange = function() {
	    if (xml.readyState == 4 && xml.status == 200) {
	        $("#success").append("<p>You have connected to CODE2040's API and registered</p>");	
	    }
	};

	xml.open("POST", url);
	xml.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	xml.send(JSON.stringify({"token": token_key.token, "github": "https://github.com/MalikG15/chrome_extension_code2040"}));
}

// Recieves response from the API
// -> This was a redudant process for the challenges so I dedicated a function 
// -> to getting a response for the API to a specific URI by posting token.
function getResponseForChallenge(apiEndPoint) {
	var xml = new XMLHttpRequest();
	var url = apiEndPoint;

	var response;


	xml.onreadystatechange = function() {
	    if (xml.readyState == 4 && xml.status == 200) {
	    	response = xml.responseText;
	    }
	};

	xml.open("POST", url, false);
	xml.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	xml.send(JSON.stringify({"token": token_key.token}));
	xml.abort();
	return response;
}

//--------------------------------------------Reverse String Challenge----------------------------------------------------------\\

// Reverses a given string into a new string in memory.
function reverseString(string) {
	var stringReversed = "";
	for (var x = string.length - 1; x >= 0; x--) {
		stringReversed += string.charAt(x);
	}
	return stringReversed;
}

// Gets the string from the API, then updates
// HTML to show the status and then sends the 
// reversed string.
function reversedStringChallenge() {
	var stringToReverse = getResponseForChallenge("http://challenge.code2040.org/api/reverse");
	$("#success").append("<p>The string sent by CODE2040 is" + stringToReverse + "</p>");	
	var reversedString = reverseString(stringToReverse);
	$("#success").append("<p>The string sent by CODE2040 reversed is" + reversedString + "</p>");	
	sendReversedString(reversedString);
}

// Sends the reversed string to the API 
function sendReversedString(string) {
	var xml = new XMLHttpRequest();
	var url = 'http://challenge.code2040.org/api/reverse/validate';

	xml.onreadystatechange = function() {
	    if (xml.readyState == 4 && xml.status == 200) {
	    	$("#success").append("<p>The reversed string has been sent!</p>");	
	    }
	};

	xml.open("POST", url, false);
	xml.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	xml.send(JSON.stringify({"token": token_key.token, "string": string}));
	xml.abort();
}

//--------------------------------------------Needle In Haystack Challenge---------------------------------------------------------\\

// Gets the response for a needle and haystack
// then iterates through the haystack to the find
// the needle. Once the needle is found, we validate
// it's location.
function needleInHaystack() {
	var raw_response = getResponseForChallenge("http://challenge.code2040.org/api/haystack")
	var response = JSON.parse(raw_response);

	var needle = response.needle;
	$("#success").append("<p>The needle is " + needle + "</p>");
	var haystack = response.haystack;
	var location = -1;
	for (var x = 0; x < haystack.length; x++) {
		if (needle === haystack[x]) {
			location = x;
			break;
		}
	}
	$("#success").append("<p>The needle is located at " + location + " in the haystack</p>");
	validateNeedleLocation("http://challenge.code2040.org/api/haystack/validate", location);
}

// Sends needle location
function validateNeedleLocation(apiEndPoint, result) {
	var xml = new XMLHttpRequest();
	var url = apiEndPoint;


	xml.onreadystatechange = function() {
	    if (xml.readyState == 4 && xml.status == 200) {
	    	$("#success").append("<p>Needle location sent to CODE2040!</p>");
	    }
	};

	xml.open("POST", url, false);
	xml.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	xml.send(JSON.stringify({"token": token_key.token, needle: result}));
	xml.abort();
}

//--------------------------------------------Words Without Prefix Challenge------------------------------------------------------------\\

// Gets the prefix and the words
// then filters the array of words
// using javascripts .filter() method
// and then returns an array satisfying
// that condition. 
function checkPrefix() {
	var raw_response = getResponseForChallenge("http://challenge.code2040.org/api/prefix");
	var response = JSON.parse(raw_response);


	var prefix = response.prefix;
	$("#success").append("<p>The prefix is " + prefix + "</p>");
	var array = response.array;

	var stringsWithoutPrefix = array.filter(function (string) {
		return !string.startsWith(prefix); 
	});

    $("#success").append("<p>A string without the prefix is " + stringsWithoutPrefix[0] + "</p>");
    validateStringsWithoutPrefix("http://challenge.code2040.org/api/prefix/validate", stringsWithoutPrefix);
}

// Sends array of words without the given prefix
function validateStringsWithoutPrefix(apiEndPoint, result) {
	var xml = new XMLHttpRequest();
	var url = apiEndPoint;


	xml.onreadystatechange = function() {
	    if (xml.readyState == 4 && xml.status == 200) {
	    	$("#success").append("<p>The strings without the prefix has been sent to CODE2040!</p>");
	    }
	};

	xml.open("POST", url, false);
	xml.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	xml.send(JSON.stringify({"token": token_key.token, array: result}));
	xml.abort();
}

//--------------------------------------------Add Time Interval Challenge---------------------------------------------------------\\

// Gets the ISO datestamp and the interval
// then changes the ISO datestamp to milliseconds
// then creates a new date object while converting
// the interval to milliseconds and then add them together.
// The total time date object is then coverted to ISO and the
// '.000' substring is removed.
function addTimeInterval() {
	var raw_response = getResponseForChallenge("http://challenge.code2040.org/api/dating");


	var response = JSON.parse(raw_response);
	
	var secondsToDate = Date.parse(response.datestamp);

	$("#success").append("<p>The date in ISO format is " + response.datestamp + "</p>");
	
	var totalsecondsToDate = new Date(secondsToDate + (response.interval*1000));

	totalsecondsToDate = (totalsecondsToDate.toISOString()).replace('.000', '');

	$("#success").append("<p>The new date in ISO format is " + totalsecondsToDate + "</p>");

	

	validateNewDate("http://challenge.code2040.org/api/dating/validate", totalsecondsToDate);
}

// Sends the ISO String to the API
function validateNewDate(apiEndPoint, result) {
	var xml = new XMLHttpRequest();
	var url = apiEndPoint;


	xml.onreadystatechange = function() {
	    if (xml.readyState == 4 && xml.status == 200) {
	    	$("#success").append("<p>The new date has been sent to CODE2040!</p>");
	    }
	};
	
	xml.open("POST", url, false);
	xml.setRequestHeader("Content-Type", "application/json; charset=UTF-8");

	xml.send(JSON.stringify({"token": token_key.token, datestamp: result}));
	xml.abort();
};

// Invoking a certain challenge function
// such as the fifth one.
addTimeInterval();












