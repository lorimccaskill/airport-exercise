var IntentMedia = IntentMedia || {};

IntentMedia.Airports = (function () {
	var pub = {};
	
	pub.airport_exists = function (airport_code) {
		return pub.airport_distances().hasOwnProperty(airport_code);
	};
	
	pub.airport_distances = function () {
		return {
			JFK: {LAX: 2475, LAS: 2248, PDX: 2454},
			LAX: {JFK: 2475, LAS: 236, PDX: 834},
			LAS: {JFK: 2248, LAX: 236, PDX: 763},
			PDX: {JFK: 2454, LAS: 763, LAX: 834}
		}
	};
	
	return pub;
}(IntentMedia || {}));

IntentMedia.Distances = (function () {
	var pub = {};
	var airport_distances = airport_distances || IntentMedia.Airports.airport_distances();

	pub.distance_between_airports = function (from_airport, to_airport) {
		if (IntentMedia.Airports.airport_exists(from_airport) && IntentMedia.Airports.airport_exists(to_airport)) {
			if (from_airport === to_airport) {
				return 0;
			}
			
			return airport_distances[from_airport][to_airport];
		}

		return -1;

	};
	
	return pub;
}(IntentMedia || {}));

function showQuestion() {
	var departureAirport = $( "input:radio[name=depart-airport]:checked" ).val();
	$( "input:radio[name=arrive-airport]" ).removeClass("hide");
	switch (departureAirport) {
		case "JFK":
		$( "#arrive-JFK" ).addClass("hide");
		break;

		case "LAX":
		$( "#arrive-LAX" ).addClass("hide");
		break;

		case "LAS":
		$( "#arrive-LAS" ).addClass("hide");
		break;

		case "PDX":
		$( "#arrive-PDX" ).addClass("hide");
		break;
	}
	
	$( "fieldset#question-destination-airport" ).fadeIn(200);
}

function travelMessage() {
	var departureAirport = $( "input:radio[name=depart-airport]:checked" ).val();
	var arrivalAirport = $( "input:radio[name=arrive-airport]:checked" ).val();
	var arrivalMessage;
	
	if ( arrivalAirport != undefined ) {
		
		switch (arrivalAirport) {
			case "JFK":
			arrivalMessage = "walking the Brooklyn Bridge.";
			$("div#message-destination .tourist-image").attr({
				id: "tourist-JFK",
				title: "Brooklyn Bridge"
			});
			break;
			
			case "LAX":
			arrivalMessage = "gazing at the sunset from the Getty.";
			$("div#message-destination .tourist-image").attr({
				id: "tourist-LAX",
				title: "Sunset seen from the Getty"
			});
			break;

			case "LAS":
			arrivalMessage = "watching the fountains dance at the Bellagio.";
			$("div#message-destination .tourist-image").attr({
				id: "tourist-LAS",
				title: "Bellagio fountains"
			});
			break;

			case "PDX":
			arrivalMessage = "browsing the shelves at Powell's.";
			$("div#message-destination .tourist-image").attr({
				id: "tourist-PDX",
				title: "Powell's bookstore"
			});
			break;
		}
		$( "div#message-destination p" ).html( IntentMedia.Distances.distance_between_airports(departureAirport, arrivalAirport) + " miles until you're " + arrivalMessage );
		$( "div#message-destination" ).delay(400).fadeIn(500);
		$( "#button-reset" ).delay(900).fadeIn(200);
	}
}

function resetApp(){
	$( "input:radio[name=depart-airport]" ).prop("checked", false);
	$( "input:radio[name=arrive-airport]" ).prop("checked", false);
	$( "div#message-destination" ).fadeOut(0);
	$( "#button-reset" ).fadeOut(200);
	$( "fieldset#question-destination-airport" ).fadeOut(0);
}