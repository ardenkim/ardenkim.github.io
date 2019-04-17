<?php
	# Minkyeong Kim
	# CSE 154 AG
	# Assignment 7: To do List
	# This page is a helper page, used to reduce redundancy from all other files

	// directs to start page if passed in parameter doesn't exist
	// function redirect_start($name) {
	// 	if (missing($name)) {
	// 		header("Location: start.php");
	// 		die();
	// 	}
	// }

	// // directs to todolist page if passed in parameter exists
	// function redirect_todolist($name) {
	// 		if (!missing($name)) {
	// 			header("Location: todolist.php");
	// 			die();
	// 		}	
	// }

	// // returns true if passed in subject string matches passed in exprssion
	// // false otherwise
	// function check_valid($regular, $subject) {
	// 	return preg_match($regular, $subject);
	// }

	// // returns true if passed in element does not exist
	// // false otherwise
	// function missing($parameter) {
	// 	return !isset($parameter);
	// }

	// the top of start page and todolist page
	function top() {
	 	?>
        <html lang="en">
        <head>

        <meta charset="utf-8">
        <title>Projects</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <meta name="author" content="Arden Kim">
        <link rel="icon" type="image/png" href="img/icon.png" />

        <!--Style-->

        <link rel="stylesheet" href="css/reset.css">
        <link rel="stylesheet" href="css/style.css">
        <link rel="stylesheet" href="css/style-responsive.css">  
        
        <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">
        
        <!--[if lt IE 9]>
        <script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
        <![endif]-->
        
        </head>

        <body>

        <!--Preloader-->

        <div class="preloader" id="preloader">
            <div class="item">
            <div class="spinner">
            </div>
            </div>
        </div>

        <div class="opacity-nav">

                <div class="menu-index" id="buttons" style="z-index:999999">
                <i class="fa  fa-close"></i>
                </div>

            <ul class="menu-fullscreen">
            <li><a class="ajax-link" href="index.php">Home</a></li>
            <!--<li><a class="ajax-link" href="projects.html">Projects</a></li>-->
            <li><a class="ajax-link" href="about-me.html">About me</a></li>
            </ul>

        </div>


        <!--Header-->
        <header id="fullscreen">
            
            <div class="logo" id="full"><a class="ajax-link" href="index.php">ARDEN MINKYEONG KIM</a></div>
            
                <div class="menu-index" id="button">
                <i class="fa fa-bars"></i>
                </div>
                
        </header>

        <div class="clear"></div>
		<?php
	}

	// the footer for start page and todolist page
	function footer() {
		?>
  <footer id="ajax-footer">

    <div class="footer-margin">
      <div class="social-footer">
        <a href="https://www.linkedin.com/in/ardenkim/"><i class="fa fa-linkedin" aria-hidden="true"></i>/ardenkim</a>
        <a href="https://github.com/ardenkim"><i class="fa fa-github" aria-hidden="true"></i>/ardenkim</a>
        <a href="mailto:arden.ischool@gmail.com"><i class="fa fa-envelope"> arden.ischool@gmail.com</i></a>
        <a><i class="fa fa-mobile"></i> 206)471-4712</a>
      </div>           
    </div>


  </footer>

<!--Scripts-->

  <script src="js/jquery.min.js"></script>
	<script src="js/jquery.easing.min.js"></script>
	<script src="js/modernizr.custom.42534.js" type="text/javascript"></script>
  <script src="js/jquery.waitforimages.js" type="text/javascript"></script>
  <script src="js/typed.js" type="text/javascript"></script>
  <script src="js/masonry.pkgd.min.js" type="text/javascript"></script>  
  <script src="js/imagesloaded.pkgd.min.js" type="text/javascript"></script>    
  <script src="js/jquery.jkit.1.2.16.min.js"></script>
 
  <script src="js/script.js" type="text/javascript"></script>
  
	<script>
    $('#button, #buttons').on('click', function() {
      $( ".opacity-nav" ).fadeToggle( "slow", "linear" );
    // Animation complete.
    });
  </script>


</body>
</html>	
		<?php
	}
?>