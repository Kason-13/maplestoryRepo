<?php
    require_once("partial/header.php");
    require_once("Action/LobbyAction.php");
    $lobbyAction = new LobbyAction();
    $data = $lobbyAction->execute();
?>
    <script src="js/audioJS/lobbyAudio.js"></script>
    <script src="js/cssManip/js/jQuery.js"></script>
    <script src="js/cssManip/js/cssManip.js"></script>
    <script src="js/lobbyChatBoxStyle.js"></script>
    <script src="js/TiledImage.js"></script>
    <script src="js/lobbyAnimation.js"></script>
    <script>
        var key = <?php echo json_encode($data["key"])?>
    </script>
    <script src="js/lobbyAjax.js"></script>
    <link rel="stylesheet" href="css/lobby.css">
    <title>lobby</title>
</head>
<body>
    <canvas id="lobbyAnimation" width="1920px"height="720px;"></canvas>
    <div id="choiceContainer">
        <h1>Menu</h1>
        <div id="buttonContainer" style="text-align:center;padding-top:1.5em;">
            <button id="LobbyButton">Jouer</button>
            <button id="LobbyButton" onclick="window.location.href='lobby.php?next=practice'">Pratique</button>
            <button id="LobbyButton" onclick="window.location.href='lobby.php?next=logout'">Quitter</button>
        </div>
    </div>
    <div id="container">
        <iframe style="width:700px;height:240px;" onload="applyStyles(this)"
                src="https://magix.apps-de-cours.com/server/#/chat/<?php
                    echo $data["key"];
                ?>">
        </iframe>
    </div>
</body>
<?php
    require_once("partial/footer.php");
