// Registering with CODE2040 API
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

// Send token with given url for data
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

///////////////////////////////// All for Reversing the String \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
function reverseString(string) {
	var stringReversed = "";
	for (var x = string.length - 1; x >= 0; x--) {
		stringReversed += string.charAt(x);
	}
	return stringReversed;
}

function reversedStringChallenge() {
	var stringToReverse = getResponseForChallenge("http://challenge.code2040.org/api/reverse");
	$("#success").append("<p>The string sent by CODE2040 is" + stringToReverse + "</p>");	
	var reversedString = reverseString(stringToReverse);
	$("#success").append("<p>The string sent by CODE2040 reversed is" + reversedString + "</p>");	
	sendReversedString(reversedString);
}

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
/////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////// All for Finding Needle in Haystack \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

// Third challenge
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
		}
	}
	$("#success").append("<p>The needle is located at " + location + " in the haystack</p>");
	validateNeedleLocation("http://challenge.code2040.org/api/haystack/validate", "needle", location);
}

// Validate response
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

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////// All for Finding Strings Without a Given Prefix \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

// Fourth challenge 
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

// Validate response 
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

checkPrefix();













