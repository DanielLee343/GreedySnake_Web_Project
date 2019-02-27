<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML>
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>贪食蛇大作战</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<link href = "css/login.css" type = "text/css" rel = "stylesheet" />
	<script type = "text/javascript" src = "js/jquery-2.2.4.js"></script>
	<script type = "text/javascript" src = "js/set.js"></script>
	<script type = "text/javascript" src = "js/login.js"></script>
  </head>
  
  <body>
    <canvas id = "can1"></canvas>
   	<form id = "form1" method = "post" action = "PlayerServlet?method=login">
   		<h1>贪食蛇大作战</h1>
   		<hr />
   		<ul>
	   		<li>账号：<input type = "text" id = "playerId" name = "playerId" autofocus placeholder = "请输入账号" value = "${sessionScope.playerId}" /><span>*</span></li>
	   		<li>密码：<input type = "password" id = "playerPassword" name = "playerPassword" placeholder = "请输入密码(6-16位)" /><span>*</span></li>
	   		<li style = "text-align:center; margin-left:0px;">
	   			<input type = "button" value = " 登 录 ">&nbsp;&nbsp;
	   			<input type = "button" value = " 注 册 ">&nbsp;&nbsp;
	   			<input type = "reset" value = " 清 空 ">
	   		</li>
	   	</ul>
   	</form>
  </body>
</html>
