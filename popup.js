/*$.ajax({
	method: 'POST',
	crossDomain: true,
	url:  'http://challenge.code2040.org/api/register',
	dataType: 'JSON',
	data: JSON.stringify({"token": "c566e0e36eff49e500e7926d2fa0180c", "github": "https://github.com/MalikG15/CODE2040"}),
	success: function(data) {
		$("#success").append("<p>You have connected to CODE2040's API</p>");
	},
	error: function(xhr, status) {
		$("#success").append(status);
	}
});*/

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

function reverseString(string) {
	var stringReversed = "";
	for (var x = string.length; x >= 0; x--) {
		stringReversed += string.charAt(x);
	}
	return stringReversed;
}

function secondChallenge() {
	var xml = new XMLHttpRequest();
	var url = 'http://challenge.code2040.org/api/reverse';

	var string;


	xml.onreadystatechange = function() {
	    if (xml.readyState == 4 && xml.status == 200) {
	    	string = xml.responseText;
	        $("#success").append("<p> The word given by CODE2040 is " + string + "</p>");	
	    }
	};

	xml.open("POST", url, false);
	xml.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	xml.send(JSON.stringify({"token": token_key.token}));
	xml.abort();

	$("#success").append("<p style='color:blue;'> The word given by CODE2040 reversed is " + reverseString(string) + "</p>");	
}


secondChallenge();	