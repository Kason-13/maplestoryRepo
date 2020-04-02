<?php
    require_once("action/CommonAction.php");

    class AjaxState extends CommonAction {

        public function __construct() {
            parent::__construct(CommonAction::$VISIBILITY_MEMBER);
        }

        protected function executeAction() {
           /*  $data = [];
            $data = */ 
            parent::callAPI("state",$_SESSION["key"]);
            /* return compact("data"); */
            return [];
        }
    }
?>