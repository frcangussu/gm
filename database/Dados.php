<?php
class Dados
{
	public $db;
	public $resultado;
	public $fileSqlite;

	public function __construct($fileSqlite=null){
		
		$this->fileSqlite = $fileSqlite;

		$db = new database($fileSqlite);

		$this->db = $db->getConexao();
	}

	public function consultar($tabela=null,$where=null,$orderBy=null) {

		$where = (dominioHelper::isnull($where)) ? null : "WHERE $where";
		//die($where);

		if (!dominioHelper::isnull($tabela)){
			$this->resultado = $this->executarConsulta($tabela,$where,$orderBy);
		} else {
			throw new Exception('Informe o nome da Tabela');
		}
	}

	public function consultarPorId($tabela=null,$id=null){
		
		if (dominioHelper::isnull($id)){
			throw new Exception('Informe o id');
		}

		if (dominioHelper::isnull($tabela)){
			throw new Exception('Informe o nome da Tabela');
		}

		$this->resultado = $this->executarConsulta($tabela,"where id = $id",null);
	}

	public function consultarFilhos($tabela=null,$id=null){
		
		if (dominioHelper::isnull($id)){
			throw new Exception('Informe o id');
		}

		if (dominioHelper::isnull($tabela)){
			throw new Exception('Informe o nome da Tabela');
		}

		$this->resultado = $this->executarConsulta($tabela,"where id_pai = $id",null);
	}

	private function getColumnsType($tabela,$params){
		$st = $this->executaSql("PRAGMA table_info($tabela)");
		$columns = $st->fetchAll(PDO::FETCH_ASSOC);

		$res = array();
		foreach ($columns as $key => $col) {
			$res[ $col["name"] ] = dominioHelper::parseType($col["type"]) ;
		}

		return $res;
	}

	private static function parseType($campo,$dado,$coltype){

		//echo "$campo - $dado - $coltype\n";

		switch ($coltype) {
			case dominioHelper::TIPO_TEXTO: $dado = "'$dado'"; 			break;
			case dominioHelper::TIPO_DATA:  $dado = "TO_DATE('$dado')"; break;
			case dominioHelper::TIPO_LOGICO: $dado = ($dado) ? 1 : 0;	break;
		}

		if ($campo)
			return array($campo=>$dado);
		else
			return null;
	}

	private function prepararDados($tabela,$params,$removeID=null){

		$colTypes = $this->getColumnsType($tabela,$params);
		$dados = get_object_vars($params);

		// remove as os campos que não estão presentes em $dados mas estão no $colTypes
		$colTypes = array_intersect_key($colTypes,$dados);

		$dados = array_map("Dados::parseType",array_keys($dados),$dados,$colTypes);
		$dados = dominioHelper::reduzArray($dados);

		// remove o campo "id"
		if ($removeID and (array_keys($dados)[0] == "id")){
			$id = array_shift($dados);
		}

		$res = array(
			"dados"   => $dados,
			"campos"  => implode(array_keys($dados),','),
			"valores" => implode(array_values($dados),',')
		);

		if (isset($id)){
			$res["id"]= $id;
		}

		return $res;

	}

	public function inserir($tabela=null,$params){
		extract($this->prepararDados($tabela,$params),EXTR_OVERWRITE);
		$sql = "insert into $tabela (".$campos.") values (".$valores.") ";

		try{
			$this->resultado = $this->executaSql($sql);
		}catch (Exception $e){
			echo $e->getMessage();
			die (" --- ".$sql);
		}
	}

	public function alterar($tabela=null,$params){
		
		extract($this->prepararDados($tabela,$params,true),EXTR_OVERWRITE);

		// prepara o SQL
		$sql = array();
		foreach ($dados as $campo => $valor) {
			array_push($sql, "$campo = $valor");
		}
		$sql = implode($sql,", ");
		$sql = "update $tabela set $sql where id = ".$id;
		$this->resultado = $this->executaSql($sql);
	}

	private function parseWhere($dados){
		$res = array();
		foreach ($dados as $campo => $valor) {
			array_push($res,"$campo = $valor");
		}

		$sql = implode(" and ", $res);

		return "where $sql";
	}

	public function excluir($tabela=null,$params){

		$dados = $this->prepararDados($tabela,$params);
		//extract($dados["dados"],EXTR_OVERWRITE);

		$where = $this->parseWhere($dados["dados"]);

		$sql = "delete from $tabela ".$where;

		try{
			
			$this->resultado = $this->executaSql($sql);

		} catch (Exception $e) {
			echo ($e->getMessage());
			die("Erro no sql: ".$sql);
		}
	}

	private function executaSql($sql){
		
		try{
			$st = $this->db->prepare($sql);
			$st->execute();
			return ($st);
		} catch (Exception $e){
			echo "<pre>";
			print_r($e);
			die();


			echo($e->getMessage());
			die($sql);
		}

	}

	private function executarConsulta($tabela="",$where=null,$orderBy=null){
		$sql = "SELECT * FROM $tabela $where ".($orderBy ? "ORDER BY ".$orderBy : "ORDER BY 2");
		$st =  $this->executaSql($sql);
		return $st->fetchAll(PDO::FETCH_ASSOC);
	}

	private function getTabela(){
		return $this->resultado;
	}

}
