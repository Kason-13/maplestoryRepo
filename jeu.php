<?php
    require_once("partial/header.php");
    require_once("Action/JeuAction.php");
    $jeuAction = new JeuAction();
    $data = $jeuAction->execute();
?>
    <title>Jeu</title>
</head>
<body>
    
</body>
<?php
    require_once("partial/footer.php");