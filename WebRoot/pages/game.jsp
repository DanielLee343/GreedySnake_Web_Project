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
	
	<link rel="stylesheet" type="text/css" href="css/game.css">
	<script type = "text/javascript" src = "js/jquery-2.2.4.js"></script>
	<script type = "text/javascript" src = "js/set.js"></script>
	<script type = "text/javascript" src = "js/pojo.js"></script>
	<script type = "text/javascript" src = "js/game.js"></script>
  </head>
  
  <body>
    <canvas id = "can1" width = "1366px" height = "638px"></canvas>
  </body>
</html>
