<?php
    require_once("action/ajaxState.php");
    $ajaxState = new AjaxState();
    $data = $ajaxState->execute();
    echo json_encode($data["returned"]);