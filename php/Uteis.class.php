<?php
abstract class Uteis
{
	static function resultSetUtf8Decode($var)
	{
		if (is_array($var))
		{
			return array_map("Uteis::resultSetUtf8Decode",$var);
		} else {
			return utf8_decode($var);
		}

	}

}