<?php
$appDir = "gm";

$path = '.:'.$_SERVER["DOCUMENT_ROOT"].'/'.$appDir.'/database'.
		 ':'.$_SERVER["DOCUMENT_ROOT"].'/'.$appDir.'/php'.
		 ':'.$_SERVER["DOCUMENT_ROOT"].'/fw/'.
		 ':'.$_SERVER["DOCUMENT_ROOT"].'/'.$appDir.'/infra'.
		 ':'.$_SERVER["DOCUMENT_ROOT"].'/fw/public';

ini_set('include_path', $path);

require_once("database.php");
require_once("dominioHelper.php");
