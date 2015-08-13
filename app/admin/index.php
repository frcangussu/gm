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
			appName:'GMAdminApp',
			libs:[

			// app
			'/gm/app/admin/admin-app.js'
			
			// controllers
			,'/gm/app/admin/admin-controller.js'
			,'/gm/app/admin/categoria/categoria-controller.js'
			,'/gm/app/admin/generate/generate-controller.js'
			,'/gm/app/admin/usuario/usuario-controller.js'
			,'/fw/public/croppic/croppic.js'
			,'/fw/public/croppic/croppic.css'

			// diretivas
			,'/gm/js/banner-directives.js'
			,'/gm/js/layout-directives.js',
			,'/gm/js/gm-directives.js',
			,'/gm/app/admin/js/admin-directives.js'

			// servicos
			,'/gm/js/gm-services.js'

			// css
			,'/gm/css/gm.css'
			
            // ,'https://angularjs.org/css/bootstrap.css'
            // ,'http://angularjs.org/css/docs.css'
            // ,'http://angularjs.org/css/font-awesome.css'

			]
		});

	</script>

</head>

<!-- <body data-vrs="2.5" data-ng-controller='SOSController as sos' data-ng-include="sos.urlAbsolutaDependencia('template-base-atendimento-tpl')"></body> -->
<body data-vrs="2.5">
		
		<div id='divApp' data-ng-controller="adminController as cAdm" >

			<!-- template de mensagens -->
<!-- 		<dl class="col40">
			<dt data-ng-repeat="msg in messages">
				<img data-ng-src="{{sos.getMsgImage(msg.type)}}"  style="margin-bottom: -4px; margin-left: 4px"/>
				<span data-ng-class="sos.getMsgClass(msg.type)">{{msg.text}}</span>
			</dt>
		</dl>	 -->

		<div data-ng-include="'admin.tpl.html'"></div>

		<!-- <div data-ng-if="!erroAcesso" data-ng-view="ng-view"></div> -->
	</div>

</body>
</html>