<?php
    session_start();
    $project = $_GET["name"];
    // $project = "project1";

    if (!isset($project)) {
        header("Location: index.php");
        die();
    }
?>
<html lang="en">
<head>

  <meta charset="utf-8">
  <title>Project Detail</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
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

  <!--Content-->

  <div class="content" id="ajax-content">
<?php
	list($title, $type, $language, $description, $link, $link2) = file("projects/" . $project . "/content.txt", FILE_IGNORE_NEW_LINES);
	$images = glob("projects/" . $project . "/images/*.jpg");

?>

        <div class="text-intro">

          <h1><?= $title ?></h1>
          
                    
	          <div class="one-column">
	            <p><?= $type ?></p>
	            <p><?= $language ?></p>
	          </div>


		          <div class="two-column">
		            <p><?= $description ?></p>
		          </div>   
                  
<?php 
        if ($link !== "NULL" && substr( $link, 0, 4 ) !== "http") {
            $link = "projects/" . $project . "/" . $link;
        }
        if($link !== "NULL") { ?>
                <p class="link"><a href="<?php echo $link ?>">website</a></p>
<?php } ?>

<?php 
        if($link2 !== "NULL") { ?>
                <p class="link"><a href="<?php echo $link2 ?>">github</a></p>
<?php } ?>
                <div class="clear"></div>   				  
                 				        
				        <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
				        
    <?php
		foreach ($images as $image) {
	?>
				    <img src="<?php echo $image ?>" width="100%"><br/><br/><br/><br/>

	<?php
		}
    ?>
				        <!--<img src="img/single/1.jpg" width="100%"><br/><br/><br/><br/>
				        <img src="img/single/2.jpg" width="100%"><br/><br/><br/><br/>
				        <img src="img/single/3.jpg" width="100%"><br/><br/><br/><br/>
				        <img src="img/single/4.jpg" width="100%"><br/><br/><br/><br/>
				        <img src="img/single/5.jpg" width="100%"><br/><br/><br/><br/>
				        <img src="img/single/6.jpg" width="100%">-->
        
        
					        <!--<div class="prev-next">
					        
					          <div class="prev-button"><a class="ajax-link" href="single-fullscreen.html">Previous work</a></div>
					          <div class="next-button"><a class="ajax-link" href="projects.html">Next work</a></div>
					
					        </div>-->
            </div>
        
    </div>


  <!--Footer-->

  <footer id="ajax-footer">

    <div class="footer-margin">
      <div class="social-footer">
        <a href="https://www.linkedin.com/in/ardenkim/"><i class="fa fa-linkedin" aria-hidden="true"></i>/ardenkim</a>
        <a href="https://github.com/ardenkim"><i class="fa fa-github" aria-hidden="true"></i>/ardenkim</a>
        <a href="mailto:ardenmkim@gmail.com"><i class="fa fa-envelope"> ardenmkim@gmail.com</i></a>
        <a><i class="fa fa-mobile"></i> (206) 466 8069</a>
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