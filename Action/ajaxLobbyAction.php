<?php
    require_once("action/CommonAction.php");

    class AjaxLobbyAction extends CommonAction {

        public function __construct() {
            parent::__construct(CommonAction::$VISIBILITY_MEMBER);
        }

        protected function executeAction() {
            $data["type"] = $_POST["type"];
            $data["key"] = $_POST["key"];
            $returned = parent::callAPI("games/auto-match",$data);
            return compact("returned");
        }
    }
?>