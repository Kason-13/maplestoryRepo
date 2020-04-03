<?php
    require_once("partial/header.php");
    require_once("Action/JeuAction.php");
    $jeuAction = new JeuAction();
    $data = $jeuAction->execute();
?>
    <script src="js\cssManip\js\jQuery.js"></script>
    <script src="js/jeuJS/gameJS.js"></script>
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
    <div id="Board-Container">
        <div id="Oppenent-Hand"></div>
        <div id="Oppenent-Field"></div>
        <div id="Player-Field"></div>
        <div id="Player-Hand"></div>
    </div>
</body>
<?php
    require_once("partial/footer.php");