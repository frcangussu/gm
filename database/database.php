<?php

class database
{
    protected $conexao = null;

    public function __construct($dsn,$username=null,$password=null)
    {

        if (!$dsn)
            $dsn = "gm.sqlite"; //database default

        //$dsn="sqlite:database/../../database/".$dsn;
        $dsn="sqlite:database/".$dsn;

        try 
        {
            //$this->conexao = new PDO($dsn, $username, $password, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
            $this->conexao = new PDO($dsn, $username, $password, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET CHARACTER SET utf8")) or die("Não foi possível abrira o banco de dados");
            //$this->conexao = new PDO($dsn, $username, $password);
            $this->conexao->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); 
        }
        catch (PDOException $e) 
        {
        	echo "<pre>";
        	print_r($e);
        	die();
            # call the get_error function
            $this->get_error($e);
        }
    }

    public function getConexao()
    {
        return $this->conexao;
    }

    public function __sleep()
    {
        return array('conexao');
    }

    public function __wakeup()
    {
        $this->conexao;
    }

}