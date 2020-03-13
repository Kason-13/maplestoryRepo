<?php
	require_once("action/CommonAction.php");

	class LobbyAction extends CommonAction {

		public function __construct() {
			parent::__construct(CommonAction::$VISIBILITY_PUBLIC);
		}

		protected function executeAction() {
			if(!empty($_GET)){
				if($_GET["next"] === "practice"){
					$data["key"] = $_SESSION["key"];
					$data["type"] = "TRAINING";
					$data["private-key"] = "";
				}
				if($_GET["next"] === "play"){
					$data["key"] = $_SESSION["key"];
					$data["type"] = "PVP";
					$data["private-key"] = "";
				}
				parent::callApi("games/auto-match",$data);
			}
			return [];
		}
	}