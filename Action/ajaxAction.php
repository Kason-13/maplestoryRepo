<?php
    require_once("action/CommonAction.php");

    class AjaxAction extends CommonAction {

        public function __construct() {
            parent::__construct(CommonAction::$VISIBILITY_MEMBER);
        }

        protected function executeAction() {
            if($_POST["which"] == "PLAY")
                $data["uid"] = $_POST["uid"];

            $data["key"] = $_SESSION["key"];
            $data["type"] = $_POST["which"];
            $returned = parent::callAPI("games/action",$data);
            return compact("returned");
        }
    }
?>