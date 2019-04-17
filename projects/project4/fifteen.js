/* 
	Minkyeong Kim
	CSE 154 AG
	Assignment 4: Fifteen Puzzle 
	
	This JavaScript makes a fifteen puzzle when load,
	allows the user to play game by clicking (moving) puzzles.
	It also allows the user to shuffle the puzzle 
	and change the puzzle's size(dimension) and background image.
	
	extra feature #1, 5 & 6 done

*/

(function() {
	"use strict";

	var DIMENSION = 100;
	var PUZZLE_SIZE = 4;
	var BLANK_TOP = 300;
	var BLANK_LEFT = 300;

	// this function sets up the HTML form element with the method we want to
	// execut when it is clicked.
	// it sets up the puzzle, its background image, and controls
	window.onload = function() {
		document.getElementById("shufflebutton").onclick = shuffle;
		imgDropDown();
		puzzleSizeDropDown();
		createTile();
		imgDisplay();
	};

	// It creates the puzzle tiles
	function createTile() {
		var puzzleArea = document.getElementById("puzzlearea");
		puzzleArea.innerHTML = "";
		for (var i = 0; i < PUZZLE_SIZE * PUZZLE_SIZE - 1; i++) {
			var row = parseInt(i / PUZZLE_SIZE);
			var column = i % PUZZLE_SIZE;

			var tile = document.createElement("div");
			var backgroundImg = document.getElementById("img-select").value;
			classAdd(tile, backgroundImg);

			tile.id = "location_" + row + "_" + column;

			tile.style.left = column * DIMENSION + "px";
			tile.style.top = row * DIMENSION + "px";

			var tileHeight = DIMENSION - 10 + "px";
			tile.style.height = tileHeight;
			tile.style.width = tileHeight;
			tile.style.lineHeight = tileHeight;

			tile.onclick = move;
			tile.onmouseover = hover;
			tile.onmouseout = hoverOut;
			puzzleArea.appendChild(tile);
		}
	}

	// positions puzzle's background image to each tile
	function imgDisplay() {
		var tiles = document.querySelectorAll(".tile");
		var x = 0;
		var y = DIMENSION;

		for (var i = 0; i < tiles.length; i++) {
			var order = document.createElement("p");
			order.innerHTML = i + 1;
			tiles[i].appendChild(order);

			if (i % PUZZLE_SIZE == 0) {
				x = 0;
				y -= DIMENSION;
			} else {
				x -= DIMENSION;
			}
			tiles[i].style.backgroundPosition = x + "px " + y + "px";
		}
	}

	// moves a movalbe tile to the empty location when clicked
	// congrats user if the user solves the puzzle after his move 
	function move() {
		if (this.classList.contains("hover")) {
			moveHelper(this);
			congrat();
		}
	}

	// takes in an element tile
	// moves a tile to the empty location
	function moveHelper(tile) {
		var tileLeft = parseInt(window.getComputedStyle(tile).left);
		var tileTop = parseInt(window.getComputedStyle(tile).top);

		tile.style.top = BLANK_TOP + "px";
		tile.style.left = BLANK_LEFT + "px";
		tile.id = "location_" + parseInt(BLANK_TOP / DIMENSION) + "_" + 
				  parseInt(BLANK_LEFT / DIMENSION);

		BLANK_TOP = tileTop;
		BLANK_LEFT = tileLeft;
	}

	// extra feature # 1
	// checks if the puzzle is solved and if solved, congrats the user with text
	function congrat() {
		var blank = "location_" + (PUZZLE_SIZE - 1) + "_" + (PUZZLE_SIZE - 1);

		if (!document.getElementById(blank) && solved()) {
			var congrat = document.createElement("div");
			congrat.innerHTML = "CONGRATUATIONS YOU WON!!!";
			congrat.id = "congrat";
			document.getElementById("output").appendChild(congrat);
		} else {
			var unsolved = document.getElementById("congrat");
			unsolved.parentNode.removeChild(unsolved);
		}
	}

	// extra feature # 1
	// checks if the user has solved the puzzle
	function solved() {
		var tiles = document.querySelectorAll(".tile");
		var lastTile = PUZZLE_SIZE * PUZZLE_SIZE;

		for (var i = 0; i < tiles.length; i++) {
			var tileId = tiles[i].id;
			var row = parseInt(i / PUZZLE_SIZE);
			var column = i % PUZZLE_SIZE;

			if (tileId != "location_" + row + "_" + column) {
				return false;
			}
		}
		return true;
	}

	// shuffles/rearranges the puzzle tiles into a solvable state
	function shuffle() {
		for (var i = 0; i < 1000; i++) {
			var neighbors = [];
			var blankRow = parseInt(BLANK_TOP) / DIMENSION;
			var blankCol = parseInt(BLANK_LEFT) / DIMENSION;

			// neighbor tiles which are directly up, left, down, or right
			neighbors.push(document.getElementById("location_" + (blankRow + 1) + "_" + blankCol));
			neighbors.push(document.getElementById("location_" + (blankRow - 1) + "_" + blankCol));
			neighbors.push(document.getElementById("location_" + blankRow + "_" + (blankCol + 1)));
			neighbors.push(document.getElementById("location_" + blankRow + "_" + (blankCol - 1)));

			for (var j = 3; j >= 0; j--) {
				if (!neighbors[j]) {
					// removes if the tile does not exist
					neighbors.splice(j, 1);
				}
			}

			// randomly choose a tile to move
			var rand = parseInt(Math.random() * neighbors.length);
			moveHelper(neighbors[rand]);
		}
		congrat();
	}

	// called when the mouse button is over the tile
	// makes the tile red if the tile is movable
	function hover() {
		if (movable(this)) {
			this.classList.add("hover");
		}
	}

	// called when the mouse button is off the tile
	// makes the tile black
	function hoverOut() {
		if (movable(this)) {
			this.classList.remove("hover");
		}
	}

	// takes in an element (tile)
	// checks if clicked tile is movable
	function movable(tile) {
		var tileTop = parseInt(window.getComputedStyle(tile).top);
		var tileLeft = parseInt(window.getComputedStyle(tile).left);
		var yDiff = Math.abs(tileTop - BLANK_TOP);
		var xDiff = Math.abs(tileLeft - BLANK_LEFT);

		// returns true if clicked tile is movable
		return (xDiff == 0 && yDiff == DIMENSION) || (yDiff == 0 && xDiff == DIMENSION);
	}

	// extra feature #5 & #6
	// takes in an id for box and function
	// creates drop down box
	function createDropDown(boxId, changeFunction) {
		var controlArea = document.getElementById("controls");
		var select = document.createElement("select");
		select.id = boxId;
		select.onchange = changeFunction;
		controlArea.appendChild(select);
	}

	// extra feature #5 and #6
	// takens in an element box, name for option, and value
	// adds options in drop down box
	function option(box, name, value) {
		var box = document.getElementById(box);
		var option = document.createElement("option");
		option.innerHTML = name;
		option.value = value;
		if (value == 4) {
			option.selected = "selected";
		}
		box.appendChild(option);
	}

	// extra feature #6
	// creates drop down box for puzzle size
	function puzzleSizeDropDown() {
		createDropDown("puzzle-size", puzzleSizeChange);
		for (var i = 2; i < 9; i++) {
			option("puzzle-size", i + " x " + i, i);
		}
	}

	// extra feature #6
	// changes puzzle size to the selected size
	function puzzleSizeChange() {
		PUZZLE_SIZE = this.value;
		DIMENSION = parseInt(400 / PUZZLE_SIZE);
		BLANK_TOP = DIMENSION * (PUZZLE_SIZE - 1);
		BLANK_LEFT = DIMENSION * (PUZZLE_SIZE - 1);
		createTile();
		imgDisplay();
	}


	// extra feature #5
	// creates drop down box for background image
	function imgDropDown() {
		createDropDown("img-select", changeImg);
		option("img-select", "Minions", "");
		option("img-select", "Monsters Inc", "monsters");
		option("img-select", "Mickey Mouse", "mickey");
		option("img-select", "Pikachu", "pikachu");
	}

	// extra feature #5
	// changes puzzle background image to the selected image
	function changeImg() {
		var tile = document.querySelectorAll(".tile");
		for (var i = 0; i < tile.length; i++) {
			classAdd(tile[i], this.value);
		}
	}

	// takes in an element and class name
	// adds class to an element
	function classAdd(tile, className) {
		tile.className = "tile";
		if (className) {
			tile.classList.add(className);
		}
	}

})();