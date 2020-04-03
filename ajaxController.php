<?php
    require_once("action/ajaxAction.php");
    $ajaxState = new AjaxState();
    $data = $ajaxState->execute();
    echo json_encode($data["returned"])
?>