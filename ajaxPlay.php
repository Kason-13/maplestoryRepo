<?php
    require_once("action/ajaxAction.php");
    $ajaxAction = new AjaxAction();
    $data = $ajaxAction->execute();
    echo json_encode($data["returned"]);
?>