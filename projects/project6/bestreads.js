/*
	Minkyeong Kim
	CSE 154 AG
	Assignment 6: Best Reads

	This JavaScript makes a webpage that displays all books' information saved on server.
	It requests, gets, and shows all books' cover image and title when load, 
	and when user clickes one of books,	it sends request, gets information from php files, 
	and displays the information for user.
*/

(function() {
	"use strict";

	// Sets up the HTML form element with the method we want to execut when it is clicked
	// Sets up all books on the page
	window.onload = function() {
		document.getElementById("back").onclick = pageLoad;
		pageLoad();
	};

	// Sends request for book information
	function sendRequest(mode, title, afterResponse) {
		var request = new XMLHttpRequest();
		request.onload = afterResponse;
		if (title) {
			request.open("GET", "http://ardenkim.github.io/projects/project6/" +
						 "bestreads.php?mode=" + mode + "&title=" + title, true);
		} else {
			request.open("GET", "http://ardenkim.github.io/projects/project6/" +
						 "bestreads.php?mode=" + mode, true);
		}
		request.send();
	}

	// Sends request for all books
	function pageLoad() {
		sendRequest("books", "", createMainPage);
	}

	// Creates the main page
	// Displays all books' cover page and titles to the page
	function createMainPage() {
		document.getElementById("singlebook").style.display = "none";
		document.getElementById("allbooks").innerHTML = "";

		var response = this.responseXML;
		var books = response.querySelectorAll("book");
		var titles = response.querySelectorAll("title");
		var folders = response.querySelectorAll("folder");
		for (var i = 0; i < books.length; i++) {
			var book = document.createElement("div");
			var cover = document.createElement("img");
			var title = document.createElement("p");
			cover.setAttribute("src", "books/" + folders[i].textContent + "/cover.jpg");
			title.innerHTML = titles[i].textContent;
			book.appendChild(cover);
			book.appendChild(title);
			book.onclick = bookClicked;
			book.id = folders[i].textContent;
			document.getElementById("allbooks").appendChild(book);
		}
	}

	// Sends requests for clicked book's info
	// Shows clicked book's information, cover image, description, and reviews 
	function bookClicked() {
		document.getElementById("title").innerHTML = "";
		document.getElementById("author").innerHTML = "";
		document.getElementById("stars").innerHTML = "";
		document.getElementById("description").innerHTML = "";
		document.getElementById("reviews").innerHTML = "";
		document.getElementById("loadinginfo").style.display = "block";
		document.getElementById("loadingdescription").style.display = "block";
		// document.getElementById("loadingreviews").style.display = "block";

		sendRequest("info", this.id, generateInfo);
		sendRequest("description", this.id, generateDescription);
		sendRequest("reviews", this.id, generateReviews);

		document.getElementById("cover").src = "books/" + this.id + "/cover.jpg";
		document.getElementById("allbooks").innerHTML = "";
		document.getElementById("singlebook").style.display = "block";
	}

	// Loads and displays information for a book
	function generateInfo() {
		document.getElementById("loadinginfo").style.display = "none";

		var bookInfo = JSON.parse(this.responseText);
		document.getElementById("title").innerHTML = bookInfo.title;
		document.getElementById("author").innerHTML = bookInfo.author;
		document.getElementById("stars").innerHTML = bookInfo.stars;
	}

	// Loads and displays description for a book
	function generateDescription() {
		document.getElementById("loadingdescription").style.display = "none";
		document.getElementById("description").innerHTML = this.responseText;
	}

	// Loads and displays reviews for a book
	function generateReviews() {
		// document.getElementById("loadingreviews").style.display = "none";
		document.getElementById("reviews").innerHTML = this.responseText;
	}
})();