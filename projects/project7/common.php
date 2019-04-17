<?php
	# Minkyeong Kim
	# CSE 154 AG
	# Assignment 7: To do List
	# This page is a helper page, used to reduce redundancy from all other files

	// directs to start page if passed in parameter doesn't exist
	function redirect_start($name) {
		if (missing($name)) {
			header("Location: start.php");
			die();
		}
	}

	// directs to todolist page if passed in parameter exists
	function redirect_todolist($name) {
			if (!missing($name)) {
				header("Location: todolist.php");
				die();
			}	
	}

	// returns true if passed in subject string matches passed in exprssion
	// false otherwise
	function check_valid($regular, $subject) {
		return preg_match($regular, $subject);
	}

	// returns true if passed in element does not exist
	// false otherwise
	function missing($parameter) {
		return !isset($parameter);
	}

	// the top of start page and todolist page
	function top() {
	 	?>
		<!DOCTYPE html>
 		<html>
 			<head>
 				<meta charset="utf-8" />
 				<title>Remember the Cow</title>
 				<link href="https://webster.cs.washington.edu/css/cow-provided.css" 
 					  type="text/css" rel="stylesheet" />
 				<link href="cow.css" type="text/css" rel="stylesheet" />
 				<link href="https://webster.cs.washington.edu/images/todolist/favicon.ico" 
 					  type="image/ico" rel="shortcut icon" />
			</head>

 			<body>
 				<div class="headfoot">
 					<h1>
 						<img src="https://webster.cs.washington.edu/images/todolist/logo.gif" 
 							 alt="logo" />
 						Remember<br />the Cow
 					</h1>
 				</div>

 				<div id="main">

		<?php
	}

	// the footer for start page and todolist page
	function footer() {
		?>
		</div>

		<div class="headfoot">
			<p>
				<q>Remember The Cow is nice, but it&apos;s a total copy of another site.</q> 
				- PCWorld<br />
				All pages and content &copy; Copyright CowPie Inc.
			</p>

			<div id="w3c">
				<a href="https://webster.cs.washington.edu/validate-html.php">
					<img src="https://webster.cs.washington.edu/images/w3c-html.png" 
						 alt="Valid HTML" /></a>
				<a href="https://webster.cs.washington.edu/validate-css.php">
					<img src="https://webster.cs.washington.edu/images/w3c-css.png" 
						 alt="Valid CSS" /></a>
			</div>
		</div>
	</body>
</html>
	
		<?php
	}
?>