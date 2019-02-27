<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@taglib uri = "http://java.sun.com/jsp/jstl/core" prefix = "c"%>
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
	
	<link rel="stylesheet" type="text/css" href="css/main.css">
	<script type = "text/javascript" src = "js/jquery-2.2.4.js"></script>
	<script type = "text/javascript" src = "js/set.js"></script>
	<script type = "text/javascript" src = "js/main.js"></script>
  </head>
  
  <body>
    <canvas id = "can1"></canvas>
   	<form id = "form1" method = "post" action = "pages/game.jsp">
   		<h1>Welcome,${sessionScope.player.playerName}!</h1>
   		<hr />
   		<ul>
	   		<li><input type = "submit" id = "playing" value = "开始" /></li>
	   		<li><input type = "button" id = "set" value = "设置" /></li>
	   		<li><input type = "button" id = "list" value = "排行榜" /></li>
	   		<li><input type = "button" id = "check" value = "查看资料" /></li>
	   		<li><input type = "button" id = "cancel" value = "注销" /></li>
	   		<li><input type = "button" id = "exit" value = "退出" /></li>
	   	</ul>
   	</form>
   	<form id = "form2" method = "post" action = "PlayerServlet?method=check">
   		<h2>我的资料</h2>
   		<hr />
   		<ul>
   			<li>账号：<input type = "text" id = "playerId" name = "playerId" value = "${sessionScope.player.playerId}" readonly /></li>
   			<li>密码：<input type = "password" id = "playerPassword" name = "playerPassword" value = "${sessionScope.player.playerPassword}" /><span></span></li>
   			<li style = "display:none">确认密码：<input type = "password" id = "playerPassword1" value = "${sessionScope.player.playerPassword}" /><span></span></li>
   			<li>昵称：<input type = "text" id = "playerName" name = "playerName" value = "${sessionScope.player.playerName}" /><span></span></li>
   			<li>最高分：<input type = "text" id = "pb" name = "pb" value = "${sessionScope.player.pb}" readonly /></li>
   			<li style = "margin-left:100px;"><input type = "submit" id = "sure" value = "确定" /></li>
   		</ul>
   	</form>
   	<form id = "form3" method = "post">
	   	<h2>排行榜</h2>
	   	<hr />
	   	<ul>
	   		<li>名次&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;账号&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;昵称&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;最高分</li>
	   		<c:forEach var = "player" items = "${sessionScope.playerList}" varStatus = "vs">
	   			<li>第${vs.index+1}名&nbsp;&nbsp;&nbsp;${player.playerId}&nbsp;&nbsp;&nbsp;${player.playerName}&nbsp;&nbsp;&nbsp;${player.pb}</li>
	   		</c:forEach>
	   		<li style = "margin-left:120px;"><input type = "button" value = "确定"></li>
	   	</ul>
   	</form>
  </body>
</html>
