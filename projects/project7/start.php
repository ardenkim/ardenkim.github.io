<?php
	// Minkyeong Kim
	// CSE 154 AG
	// Assignment 7: To do List
	// This page is the initial page
	// Displays a login form with text boxes for a username and password
	// Redirects to to-do list page if already logged in

	session_start();
	$name = $_SESSION["name"];

	include("common.php");
	# Redirects to to-do list page if already logged in
	redirect_todolist($name);

	# provides top HTML part
	top();
?>

 			<p>
				The best way to manage your tasks. <br />
				Never forget the cow (or anything else) again!
			</p>

			<p>
				Log in now to manage your to-do list. <br />
				If you do not have an account, one will be created for you.
			</p>

			<form id="loginform" action="login.php" method="post">
				<div><input name="name" type="text" size="8" autofocus="autofocus" /> 
					<strong>User Name</strong>
				</div>
				<div><input name="password" type="password" size="8" /> 
					<strong>Password</strong>
				</div>
				<div><input type="submit" value="Log in" /></div>
			</form>
	<?php
		# checks if cookie for time exists
		if (!missing($_COOKIE["time"])) { ?>
			<p>
				<em>(last login from this computer was <?=$_COOKIE["time"] ?>)</em>
			</p>
	<?php } 
		# provides a footer part of HTML
		footer();
	?>