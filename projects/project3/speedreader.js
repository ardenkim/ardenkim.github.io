/* 
	Minkyeong Kim
	CSE 154 AG
	Assignment 3 
	This JavaScript displays a word by word when a user puts input text,
	allows the user to change the speed of word animation and to change
	the animation font size.
	
*/

(function() {
	"use strict";

	var timer = null;
	var sec = 171;
	var wordsList = [];
	var startDisabled = false;

	// this function sets up the HTML form elements with the methods we want to
	// execut when they are clicked/changed.
	window.onload = function () {
		// sets up start button
		var start = document.getElementById("clickstart");
		start.onclick = clickStart;
		// sets up stop button
		var stop = document.getElementById("clickstop");
		stop.onclick = clickStop;

		document.getElementById("medium").onclick = fontSize;
		document.getElementById("big").onclick = fontSize;
		document.getElementById("bigger").onclick = fontSize;

		document.getElementById("speed").onchange = speedChange;
	};

	// word display animation starts
	// disables start button and enables stop button
	function clickStart() {
		buttonDisabled();
		var script = document.getElementById("script");
		var tempList = script.value.split(/[ \t\n]+/);
		var punctuation = ['.', ',', '!', '?', ';', ':'];
		while (tempList[0]) {
			var word = tempList.shift();
			if (punctuation.indexOf(word.charAt(word.length - 1)) > -1) {
				word = word.substring(0, word.length - 1);
				word = centering(word);
				wordsList.push(word);
			} else {
				word = centering(word);
			}
			wordsList.push(word);
		}
		generate();
	}

	// disables/enables buttons according to webpage's status
	// enables start button and disables stop button when stop
	// enables stop button and disables start button when in progress
	function buttonDisabled() {
		if (!startDisabled) {
			document.getElementById("clickstart").disabled = true;
			document.getElementById("clickstop").disabled = false;
		} else {
			document.getElementById("clickstart").disabled = false;
			document.getElementById("clickstop").disabled = true;
		}
		startDisabled = !startDisabled;
	}

	// Extra Feature
	// centers the displayed word around a specific letter in relation to its length
	// colors the center letter of the displayed letter to red
	// Returns modified word
	function centering(word) {
		var space = "";
		if (word.length < 2) {
			word = word.fontcolor("red");
		} else if (word.length === 2) {
			word = word.substring(0,1) + word.charAt(1).fontcolor("red") + "&nbsp;";
		} else if (word.length < 6) {
			for (var i = 0; i < word.length - 3; i++) {
				space += "&nbsp;";
			}
			word = coloring(space, word, 1);
		} else if (word.length < 10) {
			for (var i = 0; i < word.length - 5; i++) {
				space += "&nbsp;";
			}		
			word = coloring(space, word, 2);
		} else if (word.length < 14) {
			for (var i = 0; i < word.length - 7; i++) {
				space += "&nbsp;";
			}	
			word = coloring(space, word, 3);
		} else {
			for (var i = 0; i < word.length - 9; i++) {
				space += "&nbsp;";
			}
			word = coloring(space, word, 4);
		}
		return word;
	}

	// Extra Feature
	// centers the displayed word around a specific letter in relation to its length
	// colors the center letter of the displayed letter to red
	// Returns modified word
	function coloring(space, word, index) {
		return space + word.substring(0,index) +
			   word.charAt(index).fontcolor("red") + word.substring(index + 1);
	}
	
	// Allows word display animation begins when start button is clicked and disabled  
	function generate() {
		if (!timer && startDisabled) {
			timer = setInterval(animate, sec, wordsList);
		}
	}

	// Displays a word to the animation box
	function animate() {
		if (wordsList[0]) {
			var visual = document.getElementById("animation");
			visual.innerHTML = wordsList.shift();
		} else {
			clickStop();
		}
	}

	// Stops the animation
	// Clears the display box
	// Enables start button and disables stop button
	function clickStop() {
		buttonDisabled();
		var displayedWord = document.getElementById("animation");
		displayedWord.innerHTML = "";
		clearInterval(timer);
		timer = null;
		wordsList = [];
	}

	// Changes the displayed word's font size that is currently selected
	function fontSize() {
		var animation = document.getElementById("animation");
		animation.style.fontSize = this.value + "pt";
	}

	// Changes the animation speed according to selected option
	function speedChange() {
		clearInterval(timer);
		timer = null;
		sec = this.value;
		generate();
	}
})();