/**
 * 蛇的基类
 * @param color 颜色
 * @param speed 速度
 * @param size 尺寸
 * @param direction 方向
 * @param location 位置
 */
function Snake(color, speed, size, direction, location){
	this.color = color;
	this.speed = speed;
	this.size = size;
	this.direction = direction;
	this.location = location;
	this.step = 6;
	this.power = 0;
	this.headRadius = 12;
	this.eyeRadius = 5;
	this.pupilRadius = 3;
	this.rotate = 12;
	this.isLive = true;
}
Snake.prototype.climb = function (){
	for(var i = Math.floor(this.size)-1; i >= 0; i--){
		for(var j = this.location[i].length-1; j >= 0; j--){
			if(i == 0 && j == 0){
				this.location[i][j].x += Math.cos(this.direction*Math.PI/180)*this.speed;
				this.location[i][j].y += Math.sin(this.direction*Math.PI/180)*this.speed;
			}else if(j == 0 && i > 0){
				this.location[i][j].x = this.location[i-1][this.step-1].x;
				this.location[i][j].y = this.location[i-1][this.step-1].y;
			}else{
				this.location[i][j].x = this.location[i][j-1].x;
				this.location[i][j].y = this.location[i][j-1].y;
			}
		}
	}
};
/**
 * 玩家
 * @param color
 * @param speed
 * @param size
 * @param direction
 * @param location
 */
function PlayerSnake(color, speed, size, direction, location){
	Snake.call(this, color, speed, size, direction, location);
	this.type = 'player';
	this.kill = 0;
	this.score = 0;
}
for(var i in Snake.prototype){
	PlayerSnake.prototype[i] = Snake.prototype[i];
}
/**
 * 敌人
 * @param color
 * @param speed
 * @param size
 * @param direction
 * @param location
 * @param skill
 * @returns {enemySnake}
 */
function EnemySnake(color, speed, size, direction, location){
	Snake.call(this, color, speed, size, direction, location);
	this.type = 'enemy';
	this.skill = (Math.random() < 0.2) ? 'venom':'';
}
for(var i in Snake.prototype){
	EnemySnake.prototype[i] = Snake.prototype[i];
}
/**
 * 豆子
 * @param color
 * @param location
 * @returns {Bean}
 */
function Bean(color, location){
	this.color = color;
	this.location = location;
	this.radius = 2;
}
///**
// * 尸体 
// * @param color
// * @param location
// */
//function Corpse(color, location){
//	this.color = color;
//	this.location = location;
//	this.radius = 5;
//}