<?php
    require_once("action/ajaxLobbyAction.php");
    $ajaxLobbyAction = new AjaxLobbyAction();
    $data = $ajaxLobbyAction->execute();
    echo json_encode($data["returned"]);