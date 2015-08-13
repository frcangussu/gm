<!DOCTYPE html>
<html lang="pt-br">
<head>

	<meta charset="UTF-8"></meta>
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta name="description" content="">
	<meta name="author" content="">
	
	<title>Clsf</title>

	<script type="text/javascript" src="/fw/fw-load.js"></script>
	
	<script>

	fwConfig.init({
		appName:'GMApp',
		//appTheme: 'js/themes/freelancer.js',
		//appTheme: 'js/themes/CZSale.js',
		libs:[
	         'app/home/home-app.js'
	        ,'app/home/home-controller.js'
	        ,'js/banner-directives.js'
	        ,'js/modal-directives.js',
	        ,'js/layout-directives.js',
	        ,'js/gm-services.js'
	        ,'css/gm.css'
	        //'js/lib/gm-directives.js',
		]
	});
        
    </script>

</head>

<!-- <body data-vrs="2.5" data-ng-controller='SOSController as sos' data-ng-include="sos.urlAbsolutaDependencia('template-base-atendimento-tpl')"></body> -->
<body data-vrs="2.5">
	<div id='divApp'>
		
		<!-- template de mensagens -->
<!-- 		<dl class="col40">
			<dt data-ng-repeat="msg in messages">
				<img data-ng-src="{{sos.getMsgImage(msg.type)}}"  style="margin-bottom: -4px; margin-left: 4px"/>
				<span data-ng-class="sos.getMsgClass(msg.type)">{{msg.text}}</span>
			</dt>
		</dl>	 -->

		<div data-ng-if="!erroAcesso" data-ng-view="ng-view"></div>
	</div>

</body>
</html>