<?php
    require_once("action/CommonAction.php");

    class AjaxAction extends CommonAction {

        public function __construct() {
            parent::__construct(CommonAction::$VISIBILITY_MEMBER);
        }

        protected function executeAction() {
            switch ($_POST["which"]) {
                case "END_TURN":
                    break;
                case "PLAY":
                    $data["uid"] = $_POST["uid"];
                    break;
                case "ATTACK":
                    $data["uid"] = $_POST["uid"];
                    $data["targetuid"] = $_POST["targetUid"];
                    break;
            }
            $data["key"] = $_SESSION["key"];
            $data["type"] = $_POST["which"];
            $returned = parent::callAPI("games/action",$data);
            return compact("returned");
        }
    }
?>