<?php
    require_once("partial/header.php");
    require_once("Action/LobbyAction.php");
    $lobbyAction = new LobbyAction();
    $lobbyAction->execute();
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
    <div id="choiceContainer" style = "display:none;position:absolute;top:50%;left:45%;width:15em;height:4em;background:rgba(166, 74, 6, 0.8);color:white;">
        <div id="buttonContainer" style="text-align:center;padding-top:1.5em;">
            <button id="LobbyButton" onclick="window.location.href='lobby.php?next=play'">Jouer</button>
            <button id="LobbyButton" onclick="window.location.href='lobby.php?next=practice'">Pratique</button>
            <button id="LobbyButton" onclick="window.location.href='lobby.php?next=logout'">Quitter</button>
        </div>
    </div>
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
