<?php
require("infra/dominioHelper.php");

$ar = array(
	0=> array("id"=>"1"),
	1=> array("nome"=>"fernando"),
	2=> array("id_pai"=>"p")
);


echo "<pre>";
print_r(dominioHelper::reduzArray($ar));