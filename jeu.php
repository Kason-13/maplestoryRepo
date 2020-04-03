<?php
    require_once("partial/header.php");
    require_once("Action/JeuAction.php");
    $jeuAction = new JeuAction();
    $data = $jeuAction->execute();
?>
    <script src="js\cssManip\js\jQuery.js"></script>
    <script src="js/jeuJS/gameJS.js"></script>
    <link rel="stylesheet" href="css/jeu.css">
    <title>Jeu</title>
</head>
<body>
    <template id="Card-Template">
        <div class="Card">
            <h2></h2>
            <div class="ability"></div>
            <div class="hp"></div>
        </div>
    </template>
    <div id="BoardContainer">
        <div id="GameInfo"></div>
        <div id="OppenentHand"></div>
        <div id="OppenentField"></div>
        <div id="PlayerField"></div>
        <div id="PlayerHand"></div>
    </div>
</body>
<?php
    require_once("partial/footer.php");