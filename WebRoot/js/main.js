/**
 * 显示主页面
 */
function showMainPage(){
	var client = getClientWidthAndHeight();
	var registerFrameLeft = (client.w-parseInt($('#form1').css('width')))/2;
	var registerFrameTop = 72;
	//设置游戏区的宽和高
	setCanvasSize($('#can1'), client);
	//设置表单框的位置
	setFrameLocation($('#form1'), registerFrameLeft, registerFrameTop);
}
/**
 * 显示玩家资料
 */
function showPlayerInfo(){
	var client = getClientWidthAndHeight();
	var registerFrameLeft = (client.w-parseInt($('#form2').css('width')))/2;
	var registerFrameTop = 72;
	//设置表单框的位置
	setFrameLocation($('#form2'), registerFrameLeft, registerFrameTop);
}
/**
 * 显示玩家资料
 */
function showPlayerList(){
	var client = getClientWidthAndHeight();
	var registerFrameLeft = (client.w-parseInt($('#form3').css('width')))/2;
	var registerFrameTop = 25;
	//设置表单框的位置
	setFrameLocation($('#form3'), registerFrameLeft, registerFrameTop);
}
$(function (){
	$('#list').on('click', function (){
		$('#form1').css('display', 'none');
		$('#form3').css('display', 'block');
	});
	$('#form3 input[type="button"]').on('click', function (){
		$('#form3').css('display', 'none');
		$('#form1').css('display', 'block');
	});
	$('#check').on('click', function (){
		$('#form1').css('display', 'none');
		$('#form2').css('display', 'block');
	});
	$('#cancel').on('click', function (){
		var ok = confirm('确认注销（注销后该账户所有信息将会删除）');
		if(ok){
			window.location.href = 'PlayerServlet?method=cancel';
		}
	});
	$('#exit').on('click', function (){
		var ok = confirm('确认退出');
		if(ok){
			window.location.href = 'PlayerServlet?method=exit';
		}
	});
});
$(function (){
	$('#playerPassword').on({
		focus:function (){
			$('#sure').parent().css('display', 'none');
			$('#playerPassword1').parent().css('display', 'block');
			$('#playerPassword+span').text('');
		},
		blur:function (){
			var playerPassword = $(this).val();
			if(playerPassword.length < 6){
				$('#playerPassword+span').text('*不能小于6位');
			}else if(playerPassword.length > 16){
				$('#playerPassword+span').text('*不能超过16位');
			}else if(/^\d+$/.test(playerPassword) || /^[a-zA-Z]+$/.test(playerPassword)){
				$('#playerPassword+span').text('*密码强度较低');
			}else if(/\s+/.test(playerPassword)){
				$('#playerPassword+span').text('*密码中不能有空格');
			}else if(playerPassword == $('#playerPassword1').val()){
				$('#sure').parent().css('display', 'block');
				$('#playerPassword1').parent().css('display', 'none');
			}
		}
	});
	$('#playerPassword1').on({
		focus:function (){
			$('#sure').parent().css('display', 'none');
			$('#playerPassword1+span').text('');
		},
		blur:function (){
			var playerPassword = $(this).val();
			if(playerPassword == $('#playerPassword').val()){
				$('#sure').parent().css('display', 'block');
				$('#playerPassword1').parent().css('display', 'none');
			}else{
				$('#playerPassword1+span').text('密码不一致');
			}
		}
	});
	$('#playerName').on({
		focus:function (){
			$('#sure').parent().css('display', 'none');
			$('#playerName+span').text('');
		},
		blur:function (){
			var playerName = $(this).val();
			if(playerName == ''){
				$('#playerName+span').text('*昵称不能为空');
			}else if(playerName.length > 20){
				$('#playerName+span').text('*不能超过20位');
			}else{
				$('#sure').parent().css('display', 'block');
			}
		}
	});
});
$(function (){
	document.body.onselectstart = function (){
		return false;
	};
	showMainPage();
	showPlayerInfo();
	showPlayerList();
});