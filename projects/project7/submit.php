<?php
	// Minkyeong Kim
	// CSE 154 AG
	// Assignment 7: To do List
	// This page adds or deletes user's to-do element from user's list
	// Redirects to start page if user tries to visit this page without being logged in
	// Shows an error message if there is something wrong/invalid

	session_start();
	$name = $_SESSION["name"];

	include("common.php");
	# Redirects to start list page if not logged in
	redirect_start($name);

	$action = $_POST["action"];
	$index = $_POST["index"];
	$item = $_POST["item"];

	$file = "todo_" . $name . ".txt";

	# checks if parameter exists
	if (missing($action)) {
		# shows error for invalid action
		error();
	} else if ($action === "add") {
		# checks if user's input for to do list exists
		if (missing($item)) {
			# shows error for invalid action
			error();
		}
		file_put_contents($file, $item . "\n", FILE_APPEND);

	} else {
		# deletes selected item from the list
		$list = file($file);

		# checks if selected index is valid
		if (missing($index) || check_valid("/\D/", $index) || missing($list[$index])) {
			error();
		}
		unset($list[$index]);
		file_put_contents($file, $list);
	}

	# redirects to to-do list page
	header("Location: todolist.php");
	die();

	# shows an error message
	function error() {
		die("Invalid request");
	}
?>