<?php
    require_once("partial/header.php");
    require_once("Action/LobbyAction.php");
    $data["key"] = $_SESSION["key"];
?>
    <script src="js/audioJS/lobbyAudio.js"></script>
    <script src="js/cssManip/js/jQuery.js"></script>
    <script src="js/cssManip/js/cssManip.js"></script>
    <script src="js/TiledImage.js"></script>
    <script src="js/lobbyAnimation.js"></script>
    <link rel="stylesheet" href="css/lobby.css">
    <title>lobby</title>
</head>
<body>
    <canvas id="lobbyAnimation" width="1920px"height="720px;"></canvas>
    <!-- <div id="choiceContainer">
            <div id="LobbyButton">Jouer</div>
            <div id="LobbyButton">Pratique</div>
            <div id="LobbyButton">Quitter</div>
    </div> -->
    <div id="container">
        <iframe style="width:700px;height:240px;"
                src="https://magix.apps-de-cours.com/server/#/chat/<?php
                    echo $data["key"];
                ?>">
        </iframe>
    </div>
</body>
<?php
    require_once("partial/footer.php");
