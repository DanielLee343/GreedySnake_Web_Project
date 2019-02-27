var snakeMaxSize = 999;
var timer = null;
var timer1 = null;
var keys = new Array();
var colors = ['red', 'green', 'yellow', 'grey', ['rgb(113, 250, 101)', 'rgb(100, 251, 232)'], ['rgb(149, 100, 251)', 'rgb(250, 101, 232)'], ['rgb(249, 102, 113)', 'rgb(251, 171, 100)']];
var colors2 = ['red', 'green', 'yellow', 'grey', 'blue', 'pink', 'purple', 'lime', 'orange'];
var beans = [];
var beansCount = 200;
var player = null;
var enemys = [];
var enemysCount = 5;
/**
 * 事件绑定
 * @param obj
 * @param ev
 * @param fn
 */
function myAddEvent(obj, ev, fn){
	if(obj.attachEvent)
		obj.attachEvent('on'+ev, fn);
	else
		obj.addEventListener(ev, fn, false);
}
/**
 * 玩家操作
 */
function playerOper(){
	if(keys[37]){
		player.direction -= player.rotate;
		if(player.direction < 0){
			player.direction = 360-player.rotate;
		}
	}
	if(keys[39]){
		player.direction += player.rotate;
		if(player.direction >= 360){
			player.direction = 0;
		}
	}
	if(keys[32]){
		player.power -= 2;
		if(player.power > 0){
			player.climb();
			player.climb();
		}else{
			player.climb();
		}
	}else{
		player.climb();
		player.power++;
	}
}
function enemyOper(enemy){
	var x = enemy.location[0][0].x;
	var y = enemy.location[0][0].y;
	if(x < 40){
		if(enemy.direction >= 180 && enemy.direction < 300){
			enemy.direction += enemy.rotate;
		}else if(enemy.direction < 180 && enemy.direction > 60){
			enemy.direction -= enemy.rotate;
		}
	}else if(x > 1326){
		if(enemy.direction >= 0 && enemy.direction < 120){
			enemy.direction += enemy.rotate;
		}else if(enemy.direction < 360 && enemy.direction > 240){
			enemy.direction -= enemy.rotate;
		}
	}else if(y < 40){
		if(enemy.direction >= 270 || enemy.direction < 30){
			enemy.direction += enemy.rotate;
		}else if(enemy.direction < 270 && enemy.direction > 150){
			enemy.direction -= enemy.rotate;
		}
	}else if(y > 598){
		if(enemy.direction >= 90 && enemy.direction < 210){
			enemy.direction += enemy.rotate;
		}else if(enemy.direction < 90 || enemy.direction > 330){
			enemy.direction -= enemy.rotate;
		}
	}
	for(var i = 0; i < Math.floor(player.size); i++){
		var distance = calculateTwoPointDistance(enemy.location[0][0], player.location[i][0]);
		if(distance < 60){
			var left = enemy.location[0][0].x;
			var top = enemy.location[0][0].y;
			left += Math.cos((enemy.direction+enemy.rotate/2)*Math.PI/180)*enemy.speed;
			top += Math.sin((enemy.direction+enemy.rotate/2)*Math.PI/180)*enemy.speed;
			var distance1 = calculateTwoPointDistance({x:left, y:top}, player.location[i][0]);
			left = enemy.location[0][0].x;
			top = enemy.location[0][0].y;
			left += Math.cos((enemy.direction-enemy.rotate/2)*Math.PI/180)*enemy.speed;
			top += Math.sin((enemy.direction-enemy.rotate/2)*Math.PI/180)*enemy.speed;
			var distance2 = calculateTwoPointDistance({x:left, y:top}, player.location[i][0]);

			if(distance1 > distance){
				enemy.direction += enemy.rotate/2;
			}
			if(distance1 > distance2){
				enemy.direction += enemy.rotate/2;
			}
			if(distance2 > distance){
				enemy.direction -= enemy.rotate/2;
			}
			if(distance2 > distance1){
				enemy.direction -= enemy.rotate/2;
			}
		}
	}
	for(var i = 0; i < enemysCount; i++){
		if(enemy != enemys[i]){
			for(var j = 0; j < Math.floor(player.size); j++){
				var distance = calculateTwoPointDistance(enemy.location[0][0], enemys[i].location[j][0]);
				if(distance < 60 && enemys[i].isLive){
					var left = enemy.location[0][0].x;
					var top = enemy.location[0][0].y;
					left += Math.cos((enemy.direction+enemy.rotate/2)*Math.PI/180)*enemy.speed;
					top += Math.sin((enemy.direction+enemy.rotate/2)*Math.PI/180)*enemy.speed;
					var distance1 = calculateTwoPointDistance({x:left, y:top}, enemys[i].location[i][0]);
					left = enemy.location[0][0].x;
					top = enemy.location[0][0].y;
					left += Math.cos((enemy.direction-enemy.rotate/2)*Math.PI/180)*enemy.speed;
					top += Math.sin((enemy.direction-enemy.rotate/2)*Math.PI/180)*enemy.speed;
					var distance2 = calculateTwoPointDistance({x:left, y:top}, enemys[i].location[i][0]);

					if(distance1 > distance){
						enemy.direction += enemy.rotate/2;
					}
					if(distance1 > distance2){
						enemy.direction += enemy.rotate/2;
					}
					if(distance2 > distance){
						enemy.direction -= enemy.rotate/2;
					}
					if(distance2 > distance1){
						enemy.direction -= enemy.rotate/2;
					}
				}else if(distance < 60 && !enemys[i].isLive){
					var left = enemy.location[0][0].x;
					var top = enemy.location[0][0].y;
					left += Math.cos((enemy.direction+enemy.rotate/2)*Math.PI/180)*enemy.speed;
					top += Math.sin((enemy.direction+enemy.rotate/2)*Math.PI/180)*enemy.speed;
					var distance1 = calculateTwoPointDistance({x:left, y:top}, enemys[i].location[i][0]);
					left = enemy.location[0][0].x;
					top = enemy.location[0][0].y;
					left += Math.cos((enemy.direction-enemy.rotate/2)*Math.PI/180)*enemy.speed;
					top += Math.sin((enemy.direction-enemy.rotate/2)*Math.PI/180)*enemy.speed;
					var distance2 = calculateTwoPointDistance({x:left, y:top}, enemys[i].location[i][0]);

					if(distance1 > distance){
						enemy.direction -= enemy.rotate/2;
					}
					if(distance1 > distance2){
						enemy.direction -= enemy.rotate/2;
					}
					if(distance2 > distance){
						enemy.direction += enemy.rotate/2;
					}
					if(distance2 > distance1){
						enemy.direction += enemy.rotate/2;
					}
					enemy.climb();
				}
			}
		}
	}
	
	if(enemy.direction >= 360){
		enemy.direction = 0;
	}else if(enemy.direction < 0){
		enemy.direction = 360-enemy.rotate;
	}
		
	enemy.climb();
}
/**
 * 初始化蛇
 * @returns {}
 */
function initSnake(type, json){
	var snake = null;
	var color = colors[Math.floor((Math.random()*4))];
	var speed = 3;
	var size = 6;
	var step = 6;
	var direction = Math.floor((Math.random()*4))*90;
	var location = new Array();
	for(var i = 0; i < snakeMaxSize; i++){
		location[i] = new Array();
		for(var j = 0; j < step; j++){
			location[i][j] = {x:0, y:0};
		}
	}
	
	for(var i = 0; i < size; i++){
		for(var j = 0; j < step; j++){
			if(i == 0 && j == 0){
				location[0][0] = {x:json.x, y:json.y};
			}else if(i > 0 && j == 0){
				location[i][0].x = location[i-1][step-1].x-Math.cos(direction*Math.PI/180)*3;
				location[i][0].y = location[i-1][step-1].y-Math.sin(direction*Math.PI/180)*3;
			}else{
				location[i][j].x = location[i][j-1].x-Math.cos(direction*Math.PI/180)*3;
				location[i][j].y = location[i][j-1].y-Math.sin(direction*Math.PI/180)*3;
			}
		}
	}
	if(type == 'player'){
		snake = new PlayerSnake(color, speed, size, direction, location);
	}else{
		snake = new EnemySnake(color, speed, size, direction, location);
	}
	
	return snake;
}
/**
 * 初始化豆子
 * @returns {Bean}
 */
function initBean(){
	var color = colors[Math.floor((Math.random()*9))];
	var left = Math.round(Math.random()*1366);
	var top = Math.round(Math.random()*638);
	var location = {x:left, y:top};
	
	return new Bean(color, location);
}
/**
 * 判断两圆位置关系
 * @param circle1
 * @param radius1
 * @param circle2
 * @param radius2
 */
function judgeLocationRelation(circle1, radius1, circle2, radius2){
	//true表示相交或相切，false表示相离。
	var ok = false;
	
	var distance = calculateTwoPointDistance(circle1, circle2);
	if(distance <= radius1+radius2){
		ok = true;
	}
	
	return ok;
}
/**
 *计算两点距离 
 */
function calculateTwoPointDistance(point1, point2){
	return Math.sqrt((point1.x-point2.x)*(point1.x-point2.x)+(point1.y-point2.y)*(point1.y-point2.y));
}
/**
 * 碰撞检测
 * @param player
 */
function playerImpact(){
	var headLocation = {x:player.location[0][0].x, y:player.location[0][0].y};
	var headRadius = player.headRadius;
	var beanLocation = {x:0, y:0};
	var beanRadius = 2;
	//判断是否吃到某个豆子
	for(var i = 0; i < beansCount; i++){
		beanLocation = beans[i].location;
		if(judgeLocationRelation(headLocation, headRadius, beanLocation, beanRadius)){
			var left = Math.round(Math.random()*1366);
			var top = Math.round(Math.random()*638);
			beans[i].location = {x:left, y:top};
			player.power++;
			player.size += 0.1;
			player.score++;
		}
	}
	//是否碰到墙壁
	if(headLocation.x <= 0 || headLocation.x >= 1366 || headLocation.y <= 0 || headLocation.y >= 638){
		clearInterval(timer);
		clearInterval(timer1);
		alert('游戏结束，分数:'+player.score);
		window.location.href = 'PlayerServlet?method=gameOver&score='+player.score;
	}
	//判断是否碰到其他蛇
	for(var i = 0; i < enemysCount; i++){
		for(var j = 0; j < Math.floor(enemys[i].size); j++){
			if(judgeLocationRelation(headLocation, headRadius, enemys[i].location[j][0], enemys[i].headRadius) && enemys[i].isLive){
				clearInterval(timer);
				clearInterval(timer1);
				alert('游戏结束，分数:'+player.score);
				window.location.href = 'PlayerServlet?method=gameOver&score='+player.score;
			}else if(judgeLocationRelation(headLocation, headRadius, enemys[i].location[j][0], enemys[i].headRadius) && !enemys[i].isLive){
				player.score += 10;
				player.power += 10;
				player.size++;
				enemys[i].location[j][0] = {x:-100, y:-100};
			}
		}
	}
}

function enemyImpact(enemy){
	var headLocation = {x:enemy.location[0][0].x, y:enemy.location[0][0].y};
	var headRadius = enemy.headRadius;
	var beanLocation = {x:0, y:0};
	var beanRadius = 2;
	//判断是否吃到某个豆子
	for(var i = 0; i < beansCount; i++){
		beanLocation = beans[i].location;
		if(judgeLocationRelation(headLocation, headRadius, beanLocation, beanRadius)){
			var left = Math.round(Math.random()*1366);
			var top = Math.round(Math.random()*638);
			beans[i].location = {x:left, y:top};
			enemy.size += 0.1;
		}
	}
	if(headLocation.x <= 0 || headLocation.x >= 1366 || headLocation.y <= 0 || headLocation.y >= 638){
		enemyDie(enemy);
	}
	for(var i = 0; i < Math.floor(player.size); i++){
		if(judgeLocationRelation(headLocation, headRadius, player.location[i][0], player.headRadius)){
			enemyDie(enemy);
		}
	}
	for(var i = 0; i < enemysCount; i++){
		if(enemy != enemys[i]){
			for(var j = 0; j < Math.floor(enemys[i].size); j++){
				if(judgeLocationRelation(headLocation, headRadius, enemys[i].location[j][0], enemys[i].headRadius) && enemys[i].isLive){
					enemyDie(enemy);
				}else if(judgeLocationRelation(headLocation, headRadius, enemys[i].location[j][0], enemys[i].headRadius) && !enemys[i].isLive){
					enemy.size++;
					enemys[i].location[j][0] = {x:0, y:0};
				}
			}
		}
	}
}
/**
 * 敌人死亡
 * @param enemy
 */
function enemyDie(enemy){
	enemy.isLive = false;
	enemy.headRadius = 5;
}
/**
 * 清屏
 */
function clearScreen(){
	var canvas = $('#can1');
	var cxt = canvas[0].getContext('2d');
	
	cxt.clearRect(0, 0, 1366, 638);
}
/**
 * 画圆
 * @param x
 * @param y
 * @param radius
 * @param color
 */
function paintCircle(x, y, radius, color){
	var canvas = $('#can1');
	var cxt = canvas[0].getContext('2d');
	
	cxt.beginPath();
	cxt.fillStyle = color;
	cxt.arc(x, y, radius, 0, 2*Math.PI, true);
	cxt.fill();
	cxt.closePath();
}
/**
 * 画蛇
 * @param snake
 */
function paintSnake(snake){
	for(var i = 0; i < Math.floor(snake.size); i++){
		if(snake.location[i][0].x > 0 && snake.location[i][0].y > 0){
			paintCircle(snake.location[i][0].x, snake.location[i][0].y, snake.headRadius, snake.color);
		}
	}
	if(snake.isLive){
		paintCircle(snake.location[0][0].x+10*Math.cos((snake.direction-90)*Math.PI/180), snake.location[0][0].y+10*Math.sin((snake.direction-90)*Math.PI/180), snake.eyeRadius, 'white');
		paintCircle(snake.location[0][0].x+10*Math.cos((snake.direction+90)*Math.PI/180), snake.location[0][0].y+10*Math.sin((snake.direction+90)*Math.PI/180), snake.eyeRadius, 'white');
		paintCircle(snake.location[0][0].x+10*Math.cos((snake.direction-90)*Math.PI/180), snake.location[0][0].y+10*Math.sin((snake.direction-90)*Math.PI/180), snake.pupilRadius, 'black');
		paintCircle(snake.location[0][0].x+10*Math.cos((snake.direction+90)*Math.PI/180), snake.location[0][0].y+10*Math.sin((snake.direction+90)*Math.PI/180), snake.pupilRadius, 'black');
	}
}
/**
 * 画豆子
 * @param bean
 */
function paintBean(bean){
	paintCircle(bean.location.x, bean.location.y, bean.radius, bean.color);
}

function writeScore(player){
	var canvas = $('#can1');
	var cxt = canvas[0].getContext('2d');
	var text = '分数:'+player.score;
	
	cxt.fillStyle = 'black';
	cxt.font = '32px 新宋体';
	cxt.fillText(text, 0, 30);
}
/**
 * 运行
 */
function run(){
	var canvas = $('#can1');
	var cxt = canvas[0].getContext('2d');
	player = initSnake('player', {x:730, y:350});
	for(var i = 0; i < beansCount; i++){
		beans[i] = initBean();
	}
	for(var i = 0; i < enemysCount; i++){
		var left = Math.floor(Math.random()*1366);
		var top = Math.floor(Math.random()*638);
		enemys[i] = initSnake('enemy', {x:left, y:top});
	}
	timer1 = setInterval(function (){
		var left = Math.floor(Math.random()*1366);
		var top = Math.floor(Math.random()*638);
		enemys.push(initSnake('enemy', {x:left, y:top}));
		enemysCount++;
	}, 8000);
	
	timer = setInterval(function (){
		clearScreen();
		for(var i = 0; i < beansCount; i++){
			paintBean(beans[i]);
		}
		playerOper();
		playerImpact();
		paintSnake(player);
		for(var i = 0; i < enemysCount; i++){
			if(enemys[i].isLive){
				enemyOper(enemys[i]);
				enemyImpact(enemys[i]);
			}
			paintSnake(enemys[i]);
		}
		writeScore(player);
	}, 30);
}
$(function (){
	myAddEvent(document, 'keydown', function (ev){	//当按下某个键时，令keys下标为该键的ASCLL码的值为true。
		var oEvent=ev||event;
		keys[oEvent.keyCode] = true;
	});
	myAddEvent(document, 'keyup', function (ev){		//和上述相反
		var oEvent=ev||event;
		keys[oEvent.keyCode] = false;
	});
	run();
});