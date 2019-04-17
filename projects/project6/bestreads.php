<?php
	# Minkyeong Kim
	# CSE 154
	# Assignment 6: Best Reads

	# This web service takes a book title and mode as parameters
	# and outputs all books' general title and location information,
	# each book's information, description, reviews of the book
	# as XML, JSON, plain text, and HTML.

	$book = $_GET["title"];
	$mode = $_GET["mode"];

	# Calls a function to create and print outputs information 
	# as JSON, HTML, XML, or Plain Text
	# according to parameters given 
	if ($mode == "books") {
		createXML();
	} else if ($mode == "description") {
		createText($book);
	} else if ($mode == "reviews") {
		createHTML($book);
	} else if ($mode == "info") {
		createJSON($book);
	}

	# creates and prints XML about the passed in title
	# XML contains reviews of the book for passed in title
	function createHTML($book) {
		$reviews = glob("books/" . $book . "/review*.txt");

		foreach ($reviews as $review) {
			list($reviewer, $stars, $text) = file($review, FILE_IGNORE_NEW_LINES);
			?>
			<h3><?= $reviewer ?>
				<span><?= $stars ?></span>
			</h3>
			<p><?= $text ?></p>
			<?php
		}
	}

	# creates and prints JSON about the passed in title
	# JSON contains general information of the book for passed in title
	function createJSON($book) {
		list($title, $author, $stars) = file("books/" . $book . "/info.txt", 
											 FILE_IGNORE_NEW_LINES);
		$data = array(
			"title" => $title,
			"author" => $author,
			"stars" => $stars,
			);

		header("Content-type: text/json");
		print json_encode($data);
	}

	# creates and prints plain text file about the passed in title
	# text file contains description of the book for passed in title
	function createText($book) {
		$description = file_get_contents("books/" . $book . "/description.txt");
		header("Content-type: text/plain");
		print $description;
	}

	# creates and prints XML for all books in the server
	# XML contains all books' titles and their location information
	function createXML() {
		$xmldoc = new DOMDocument();
		$books_tag = $xmldoc->createElement("books");
		$books_list = glob("books/*");
		console.log($books_list);
		foreach ($books_list as $book_folder) {
			$book_tag = $xmldoc->createElement("book");
			$title_tag = $xmldoc->createElement("title");
			$folder_tag = $xmldoc->createElement("folder");

			$info = file($book_folder . "/info.txt", FILE_IGNORE_NEW_LINES);
			$title_tag->appendChild($xmldoc->createTextNode($info[0]));
			$folder_tag->appendChild($xmldoc->createTextNode(basename($book_folder)));

			$book_tag->appendChild($title_tag);
			$book_tag->appendChild($folder_tag);
			$books_tag->appendChild($book_tag);
		}
		$xmldoc->appendChild($books_tag);

		header("Content-type: text/xml");
		print($xmldoc->saveXML());
	}
?>