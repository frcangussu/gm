<?php
/*
*	!!! THIS IS JUST AN EXAMPLE !!!, PLEASE USE ImageMagick or some other quality image processing libraries
*/

$imagePath = "temp/";

$allowedExts = array("gif", "jpeg", "jpg", "png", "GIF", "JPEG", "JPG", "PNG");
$temp = explode(".", $_FILES["img"]["name"]);
$extension = end($temp);

	//Check write Access to Directory

if(!is_writable($imagePath)){
	$response = Array(
		"status" => 'error',
		"message" => 'Can`t upload File; no write Access: ' . $imagePath.$_FILES["img"]["name"]
		);
	print json_encode($response);
	return;
}

if ( in_array($extension, $allowedExts))
{
	if ($_FILES["img"]["error"] > 0)
	{
		$response = array(
			"status" => 'error',
			"message" => 'ERROR Return Code: '. $_FILES["img"]["error"],
			);			
	}
	else
	{
		$filename = $_FILES["img"]["tmp_name"];
		list($width, $height) = getimagesize( $filename );

		move_uploaded_file($filename,  $imagePath . $_FILES["img"]["name"]);

		if ($imagePath . $_FILES["img"]["name"]){
			$new_filename = "uncroppedImg_".rand();
			
			try {
				rename($imagePath . $_FILES["img"]["name"], $imagePath.$new_filename);
				$response = array(
					"status" => 'success',
					//"url" => "/gm/app/croppic/".$imagePath.$_FILES["img"]["name"],
					"url" => "/gm/app/croppic/".$imagePath.$new_filename,
					"width" => $width,
					"height" => $height
					);
			} catch (Exception $e) {
				$response = array(
					"status" => 'error',
					"message" => 'Erro ao renomear o arquivo',
					);			
			}
		}


	}
}
else
{
	$response = array(
		"status" => 'error',
		"message" => 'something went wrong, most likely file is to large for upload. check upload_max_filesize, post_max_size and memory_limit in you php.ini',
		);
}
print json_encode($response);

?>