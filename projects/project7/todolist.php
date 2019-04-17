<?php
	# Minkyeong Kim
	# CSE 154 AG
	# Assignment 7: To do List
	# This page displays user's to-do list and allows user to add/delete from it
	# Redirects to start page if user tries to visit this page without being logged in

	session_start();
	$name = $_SESSION["name"];

	include("common.php");
	# Redirects to start page if not logged in
	redirect_start($name);

	# provides top HTML part
	top();

	$file = "todo_" . $name . ".txt";
	$index = 0;
?>

			<h2><?= $name?>'s To-Do List</h2>

			<ul id="todolist">

			<?php
				# checks if a file for user's to-do list exists
				if (file_exists($file)) {
					$list = file($file, FILE_IGNORE_NEW_LINES);
					# displays all in user's to-do list
					foreach ($list as $item) { ?>
						<li>
							<form action="submit.php" method="post">
								<input type="hidden" name="action" value="delete" />
								<input type="hidden" name="index" value=<?=$index ?> />
								<input type="submit" value="Delete" />
							</form>
							<?=htmlspecialchars($item) ?>
						</li>
			<?php
						$index++; 
					} 
				} 
			?>

				<li>
					<form action="submit.php" method="post">
						<input type="hidden" name="action" value="add" />
						<input name="item" type="text" size="25" autofocus="autofocus" />
						<input type="submit" value="Add" />
					</form>
				</li>
			</ul>

			<div>
				<a href="logout.php"><strong>Log Out</strong></a>
				<em>(logged in since <?=$_COOKIE["time"] ?>)</em>
			</div>
			<?php
				# provides a footer part of HTML
				footer();
			?>