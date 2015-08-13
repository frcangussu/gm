<?Php
echo "ok";
error_reporting(E_ALL);
require_once("../infra/dominioHelper.php");
require_once("database.php");
require_once("Dados.php");
$dados = new Dados('/../../database/classificados.sqlite');
$dados->consultar("categoria");
echo "<pre>";
print_r($dados);