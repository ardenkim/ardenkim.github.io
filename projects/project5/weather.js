/* 
	Minkyeong Kim
	CSE 154 AG
	Assignment 5: Weather 
	
	This JavaScript makes a webpage that displays current weather
	when the user searches for a certain city.
	It shows some suggested lists of cities in search box.
	When user searches for a city, it sends a request and gets information
	for php files.
	Allows users to see the current temperature, hourly temperature,
	precipitations, and weather forcasts.
*/

(function() {
	"use strict";

	var hourlyTemps = [];

	// this function sets up the HTML form elements with the methods we want
	// to execut when it is clicked or changed
	// sets up the list of cities in search box 
	window.onload = function() {
		document.getElementById("search").onclick = searchClicked;
		document.getElementById("slider").onchange = sliderMoved;
		document.getElementById("temp").onclick = tempClicked;
		document.getElementById("precip").onclick = precipClicked;

		sendRequest("cities", dataList);
	};

	// this function sends request for weather information
	function sendRequest(id, afterResponse) {
		var request = new XMLHttpRequest();
		request.onload = afterResponse;
		request.open("GET", "https://webster.cs.washington.edu/cse154/weather.php?mode=" + id, 
					 true);
		request.send();
	}

	// Handles errors by displaying a message indicating the error
	function loadingFailure(error) {
		if (error.status == 410) {
			featureDisplay("none");
			document.getElementById("nodata").style.display = "block";
		} else {
			document.getElementById("resultsarea").style.display = "none";
			document.getElementById("errors").innerHTML = "Error Occured while processing: " + 
															error.responseText;
		}
	}

	// Adds weather data to the website to show them to the users
	function insertHelper(into, data, tag, className) {
		var inserted = document.createElement(tag);
		inserted.innerHTML = data;
		if (className) {
			inserted.className = className;
		}
		into.appendChild(inserted);
	}

	// Enables search box after loading is done
	// Makes a list of the city names into the search box
	// Shows error message when there is an error
	function dataList() {
		document.getElementById("loadingnames").style.display = "none";
		if (this.status == 200) {
			var cities = this.responseText.split("\n");
			var list = document.getElementById("cities");
			for (var i = 0; i < cities.length; i++) {
				insertHelper(list, cities[i], "option", "");
			}
			document.getElementById("citiesinput").disabled = false;
		} else {
			document.getElementById("resultsarea").style.display = "block";
			loadingFailure(this);
		}
	}

	// Changes features' displays according to given condition
	function featureDisplay(status) {
		document.getElementById("buttons").style.display = status;
		document.getElementById("temps").style.display = status;
		document.getElementById("loadinglocation").style.display = status;
		document.getElementById("loadinggraph").style.display = status;
		document.getElementById("loadingforecast").style.display = status;
		document.getElementById("forecastsarea").style.display = status;
		document.getElementById("location").style.display = status;
	}

	// Gets data for the city that user searches for and show them 
	// Ignores when user tries to search nothing
	function searchClicked() {
		var city = document.getElementById("citiesinput").value.split(" ").join("");
		// ignores when user tries to search for ""
		if (city) {
			document.getElementById("nodata").style.display = "none";
			featureDisplay("block"); 	// loaings, slider, and buttons appear
			tempClicked();				// hourly info display set up

			// clears prev search
			document.getElementById("errors").innerHTML = "";
			document.getElementById("location").innerHTML = "";
			document.getElementById("currentTemp").innerHTML = "";
			document.getElementById("forecast").innerHTML = "";
			document.getElementById("graph").innerHTML = "";

			document.getElementById("resultsarea").style.display = "block";

			sendRequest("oneday&city=" + city, todayData);
			sendRequest("week&city=" + city, weekData);
		}
	}

	// Loads weather data for today
	// Shows description about searched city's location and current weather 
	// Builds a precipitation graph for today and hourly temperature slider
	// Shows error message when there is an error
	function todayData() {
		if (this.status == 200) {
			document.getElementById("loadinglocation").style.display = "none";
			var locationInfo = document.getElementById("location");
			var cityName = this.responseXML.querySelector("name").textContent;
			var description = this.responseXML.querySelector("symbol").getAttribute("description");
			var date = new Date();

			insertHelper(locationInfo, cityName, "p", "title");
			insertHelper(locationInfo, date, "p", "");
			// end of description part


			// builds precipitation data graph
			document.getElementById("loadinggraph").style.display = "none";
			var graph = document.getElementById("graph");
			var precip = this.responseXML.querySelectorAll("clouds");

			var row = document.createElement("tr");
			for (var i = 0; i < precip.length; i++) {
				var cell = document.createElement("td");
				var data = document.createElement("div");
				var chance = precip[i].getAttribute("chance");
				data.innerHTML = chance + "&percnt;";
				data.style.height = chance + "px";
				cell.appendChild(data);
				graph.appendChild(cell);
			}

			// getting data for hourly temperature
			var hourlyTempArea = document.getElementById("temps");
			hourlyTemps = this.responseXML.querySelectorAll("temperature");
			document.getElementById("slider").value = 0;
			currentTemp(0);
		} else { 
			loadingFailure(this);
		}
	}

	// Shows temperature at a chosen time (where the slider bar at)
	function sliderMoved() {
		var sliderAt = this.value / this.step;
		currentTemp(sliderAt);
	}

	// Shows chosen temperature from the hourly temperature
	function currentTemp(sliderAt) {
		var currentTempArea = document.getElementById("currentTemp");
		var currentTemp = Math.round(hourlyTemps[sliderAt].textContent);
		currentTempArea.innerHTML = currentTemp + "&#8457;";
	}

	// Changes features' display according to the condition given
	function tempClicked() {
		document.getElementById("temps").style.display = "block";
		document.getElementById("graph").style.display = "none";
	}

	// Changes features' display according to the condition given
	function precipClicked() {
		document.getElementById("graph").style.display = "block";
		document.getElementById("temps").style.display = "none";
	}

	// Loads weather data for week forecast
	// Builds a temperature forecast table with pictures
	// Shows error message when there is an error
	function weekData() {
		if (this.status == 200) {
			document.getElementById("loadingforecast").style.display = "none";
			var forecastTable = document.getElementById("forecast");
			var forecast = JSON.parse(this.responseText);

			var iconRow = document.createElement("tr");
			var tempRow = document.createElement("tr");
			for (var i = 0; i < forecast.weather.length; i++) {
				var icon = forecast.weather[i].icon;
				var cell = document.createElement("td");
				var data = document.createElement("img");
				data.setAttribute("src", "https://openweathermap.org/img/w/" + 
												  icon + ".png");
				cell.appendChild(data);
				iconRow.appendChild(cell);

				var temp = Math.round(forecast.weather[i].temperature);
				var column = document.createElement("td");
				column.innerHTML = temp + "&#176;";
				tempRow.appendChild(column);
			}

			forecastTable.appendChild(iconRow);
			forecastTable.appendChild(tempRow);
		} else {
			loadingFailure(this);
		}
	}

})();