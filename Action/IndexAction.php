<?php
    session_start();
    function execute(){
        $isEmpty = false;
        $authValidity = false;
        if(!empty($_POST)){
            $isEmpty = true;
            if($_POST["username"] === "testUser" && $_POST["password"] == "AAAaaa111")
                    $authValidity = true;
        }
        return compact("isEmpty","authValidity");
    }
?>