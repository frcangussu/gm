<?php
require_once("../conf/config.php");
require_once("Dados.php");
require_once("Uteis.class.php");


require 'Slim/Slim.php';
\Slim\Slim::registerAutoloader();

$app = new \Slim\Slim();

$app->response()->header('Content-Type', 'application/json;charset=utf-8');

$app->get('/', function () {
	echo "SlimProdutos";
});


//http://localhost/gm/rest/banner
$app->get('/banner',function(){
	$arr = array("slide-00.jpg","slide-01.jpg","slide-02.jpg");
	echo json_encode($arr);
});

$app->get('/consultar/:tabela',function($tabela){
	$dados = new Dados('/../../database/classificados.sqlite');
	$dados->consultar($tabela);
	echo (json_encode($dados->resultado,JSON_UNESCAPED_UNICODE));
});

$app->get('/consultar/:tabela/:where',function($tabela,$where){
	
	$where = implode(json_decode(urldecode($where))," and ");
	$dados = new Dados('/../../database/classificados.sqlite');
	$dados->consultar($tabela,$where);
	echo (json_encode($dados->resultado,JSON_UNESCAPED_UNICODE));
});

$app->get('/consultarPorId/:tabela/:id',function($tabela,$id){
	
	$dados = new Dados('/../../database/classificados.sqlite');
	$dados->consultarPorId($tabela,$id);

	echo (json_encode($dados->resultado,JSON_UNESCAPED_UNICODE));
});

$app->get('/consultarFilhos/:tabela/:idPai',function($tabela,$idPai){
	
	$dados = new Dados('/../../database/classificados.sqlite');
	$dados->consultarFilhos($tabela,$idPai);

	echo (json_encode($dados->resultado,JSON_UNESCAPED_UNICODE));
});



$app->post('/executar/:operacao/:tabela',function($operacao,$tabela){

	$dados = new Dados('/../../database/classificados.sqlite');

	try {
		$request = \Slim\Slim::getInstance()->request();
		$param = json_decode($request->getBody());
	} catch (Exception $e) {}

	// o método consulta não entra por ser via GET
	switch ($operacao) {
		case 'inserir':   $dados->inserir($tabela,$param); break;
		case 'alterar':   $dados->alterar($tabela,$param); break;
		case 'excluir':   $dados->excluir($tabela,$param); break;
	}

	echo (json_encode($dados->resultado, JSON_UNESCAPED_UNICODE));
});

$app->run();