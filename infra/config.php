<?php

$path = '.:'.$_SERVER["DOCUMENT_ROOT"].'/gm/database'.
		 ':'.$_SERVER["DOCUMENT_ROOT"].'/gm/php'.
		 ':'.$_SERVER["DOCUMENT_ROOT"].'/fw/'.
		 ':'.$_SERVER["DOCUMENT_ROOT"].'/gm/infra';

ini_set('include_path', $path);

require_once("database.php");
require_once("dominioHelper.php");
