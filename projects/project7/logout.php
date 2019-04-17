<?php
	# Minkyeong Kim
	# CSE 154 AG
	# Assignment 7: To do List
	# This page allows a user to logout and directs to start page when logged in
	# Also directs users to start page when they try to visit this page when not logged in

	session_start();
	$name = $_SESSION["name"];

	# checks if user is logged in
	if (isset($name)) {
		session_destroy();
		session_regenerate_id(TRUE);
	}
	header("Location: start.php");
	die();
?>