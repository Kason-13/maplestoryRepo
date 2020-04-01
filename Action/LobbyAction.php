<?php
	require_once("action/CommonAction.php");

	class LobbyAction extends CommonAction {

		public function __construct() {
			parent::__construct(CommonAction::$VISIBILITY_MEMBER);
		}

		protected function executeAction() {
			if(!empty($_GET)){
				$data["key"] = $_SESSION["key"];
				$data["private-key"] = "";
				switch ($_GET["next"]) {
					case 'practice':
						$data["type"] = "TRAINING";
						break;
					case 'play':
						$data["type"] = "PVP";
						break;
					case 'logout':
						session_destroy();
						header("location:index.php");
						exit;
				}
				parent::callApi("games/auto-match",$data);
			}
			return [];
		}
	}