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
        <div class="monster">
            <h2></h2>
            <div class="ability"></div>
            <div class="hp"></div>
        </div>
    </template>
</body>
<?php
    require_once("partial/footer.php");