<?php
    require_once("action/CommonAction.php");

    class AjaxState extends CommonAction {

        public function __construct() {
            parent::__construct(CommonAction::$VISIBILITY_MEMBER);
        }

        protected function executeAction() {
            $data["key"] = $_SESSION["key"];
            $returned = parent::callAPI("games/state",$data);
            return compact("returned");
        }
    }
?>