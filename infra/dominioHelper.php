<?php

class dominioHelper
{
	const TIPO_TEXTO = 'TEXTO';
	const TIPO_INTEIRO = "INTEIRO";
	const TIPO_LOGICO = "LOGICO";
	const TIPO_DATA = "DATA";

	// converte um array bidimensional em unidimensional
	public static function reduzArray($input){
		$output = array();
		foreach ($input as $key => $value) {
			
			try{
				foreach ($value as $k => $v) {
					$output[$k] = $v;
				}
			} catch (Exception $e) {}

		}
		return $output;
	}

	public static function isnull($data)
	{
		switch ($data) {
		    // Add whatever your definition of null is
		    // This is just an example
		    //-----------------------------
		    case 'unknown': // continue
		    case 'undefined': // continue
		    //-----------------------------
		    case 'null': // continue
		    case 'NULL': // continue
		    case NULL:
		    return empty($data) or true;
		}

		// return false by default
		return false;
	}

	public static function parseType($type){

		$type = strtoupper($type);

		$TIPOS = array(
			"INTEGER"  => dominioHelper::TIPO_INTEIRO,
			"INT"  	   => dominioHelper::TIPO_INTEIRO,
			"VARCHAR"  => dominioHelper::TIPO_TEXTO,
			"CHAR"	   => dominioHelper::TIPO_TEXTO,
			"BOOL"	   => dominioHelper::TIPO_LOGICO,
			"BOOLEAN"  => dominioHelper::TIPO_LOGICO,
			"DATETIME" => dominioHelper::TIPO_DATA,
			"DATE"	   => dominioHelper::TIPO_DATA
		);

		foreach ($TIPOS as $key => $value) {
			
			if (count(explode($key,$type)) > 1)
				return $value;
		}
	}
}