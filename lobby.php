<?php
    require_once("partial/header.php");
    require_once("Action/LobbyAction.php")
?>
    <script src="js/audioJS/lobbyAudio.js"></script>
    <script src="js/cssManip/js/jQuery.js"></script>
    <script src="js/cssManip/js/cssManip.js"></script>
    <script src="js/lobbyAnimation.js"></script>
    <link rel="stylesheet" href="css/lobby.css">
    <title>lobby</title>
</head>
<body>
    <canvas id="lobbyAnimation"></canvas>
        <iframe style="width:700px;height:240px;"
                src="https://magix.apps-de-cours.com/server/#/chat/votre-clé-ici">
        <div id="choiceContainer">
            <div id="LobbyButton">Jouer</div>
            <div id="LobbyButton">Pratique</div>
            <div id="LobbyButton">Quitter</div>
        </div>
    </iframe>
</body>
<?php
    require_once("partial/footer.php");
