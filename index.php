<?php
    require_once("partial/header.php");
?>
    <script src="js/cssManip/js/jQuery.js"></script>
    <script src="js/cssManip/js/cssManip.js"></script>
    <script src="js/cssManip/js/index.js"></script>
    <link rel="stylesheet" href="css/index.css">
    <script src="js/indexAudio.js"></script>
    <script src="js/logInAnimation.js"></script>
    <title>LogIn</title>
</head>
<body>
    <canvas id = logInContainer></canvas>
        <div id="idTitle">
            <h1>MAGIX</h1>
            <h2>Maple Story Edition</h2>
        </div>
        <div id="formContainer">
            <h1>A new world ahead</h1>
            <form action="index.html" method="POST">
                <input type="text" name="username" id="user" placeholder="Username">
                <input type="password" name="password" id="pass"  placeholder="password">
                <button type="submit">LogIn</button>
            </form>
        </div>
</body>
<?php
    require_once("partial/footer.php");
