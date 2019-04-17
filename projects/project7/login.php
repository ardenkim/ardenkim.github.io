<?php
	# Minkyeong Kim
	# CSE 154 AG
	# Assignment 7: To do List
	# This page allows a user to login with their correct username and password 
	# Shows an error if they try to log in without username or password
	# Creates an username with password if typed username and password satisfy the requirements
	# Redirects to to-do list page if already logged in

	session_start();
	$login = $_SESSION["name"];

	include("common.php");
	# Redirects to to-do list page if already logged in
	redirect_todolist($login);

	$name = $_POST["name"];
	$password = $_POST["password"];

	# shows error message if user does not put either username or password to the textbox
	if (empty($name) || empty($password)) {
		die("Error, no name/password submitted");
	}

	# creates a file for usernames if a file doesn't exist
	if (!file_exists("users.txt")) {
		file_put_contents("users.txt", "");
	}

	$valid_pwd = exist($name);

	# checks if typed username exists
	if (missing($valid_pwd)) { 
		# checks if user's username and password satisfy the requirements
		if (check_valid("/^[a-z]([a-z]|\d){2,7}$/", $name) && 
			check_valid("/^\d(.{4,10})\W$/", $password)) {
			# creates account
			$new_account = $name . ":" . $password . "\n";
			$valid_pwd = $password;
			file_put_contents("users.txt", $new_account, FILE_APPEND);
		} 
	}

	# checks if typed password is right
	if ($password === $valid_pwd) {
		$_SESSION["name"] = $name;
		setcookie("time", date("D y M d, g:i:s a"), time() + 60*60*24*7);
		header("Location: todolist.php");
	} else {	
		# when password is wrong or user's input not valid for creating an account
		header("Location: start.php");
	}
	die();
	
	# returns password if given username exists
	# returns null otherwise
	function exist($name) {
		$users = file("users.txt", FILE_IGNORE_NEW_LINES);
		foreach ($users as $user) {
			list($id, $pwd) = explode(":", $user, 2);
			if ($name === $id) {
				return $pwd;
			}
		}
		return null;
	}
?>