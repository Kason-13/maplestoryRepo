<?php
    require_once("partial/header.php");
    require_once("Action/JeuAction.php");
    $jeuAction = new JeuAction();
    $data = $jeuAction->execute();
?>
    <script src="js\cssManip\js\jQuery.js"></script>
    <script src="js/jeuJS/layoutJS.js"></script>
    <script src="js/jeuJS/gameList.js"></script>
    <script src="js/jeuJS/gameJS.js"></script>
    <link rel="stylesheet" href="css/jeu.css">
    <title>Jeu</title>
</head>
<body>
    <template id="CardTemplate">
        <div class="Card">
            <h2></h2>
            <div style="width:150px; height:100px;">
                <img src="" id="CardImage">
            </div>
            <div class="ability"></div>
            <div class="hp"></div>
            <div class="atk"></div>
            <div class="cost"></div>
            <div class="uid" style="display:none;"></div>
        </div>
    </template>
    <div id="WaitingBox"style="display:none;color:white;background-color:rgba(35,35,35,0.7);position:absolute;top:45%;left:30%;padding:2em;">
        <h2 style="text-align:center;">LOOKING FOR A WORTHY OPPONENT, PLEASE BE PATIENT</h2>
        <button id="RespawnButton"
                        style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
	                    background-color: tomato;
	                    border-color: teal;
                        border-radius: 5px;
                        display:none"
                        onclick="window.location.href='lobby.php'">RESPAWN AT THE NEAREST TOWN</button>
    </div>
    <div id="endTurn">End Turn</div>
    <div id="BoardContainer">
        <div id="OpponentContainer">
            <div id="OpponentHand"></div>
            <div id="opponentHero" style="border-radius:150px"></div>
            <div id="OpponentHP"></div>
        </div>
        <div id="OpponentField"></div>
        <div id="PlayerField"></div>
        <div id="PlayerContainer">
            <div id="PlayerHand"></div>
            <div id="PlayerHP"></div>
        </div>
    </div>
</body>
<?php
    require_once("partial/footer.php");