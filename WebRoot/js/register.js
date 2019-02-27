/**
 * 显示注册页面
 */
function showRegisterPage(){
	var client = getClientWidthAndHeight();
	var registerFrameLeft = (client.w-parseInt($('#form1').css('width')))/2;
	var registerFrameTop = 70;
	//设置游戏区的宽和高
	setCanvasSize($('#can1'), client);
	//设置注册框的位置
	setFrameLocation($('#form1'), registerFrameLeft, registerFrameTop);
}
$(function (){
	$('#playerId').on({
		focus:function (){
			$('#playerId+span').text('');
		},
		blur:function (){
			var playerId = $(this).val();
			if(playerId == ''){
				$('#playerId+span').text('*账号不能为空');
			}else if(playerId.length > 15){
				$('#playerId+span').text('*不能超过15位');
			}else if(!/^[a-zA-Z0-9]+$/.test(playerId)){
				$('#playerId+span').text('*只能包含字母数字');
			}
			else{
				$.ajax({
					url:'PlayerServlet?method=isPlayerIdExist',
					data:{'playerId':playerId},
					type:'post',
					dataType:'text',
					success:function (result){
						if(result == 'fail'){
							$('#playerId+span').text('');
						}else{
							$('#playerId+span').text('*该账号已存在');
						}
					},
					error:function (){
						alert('请求失败');
					}
				});
			}
		}
	});
	$('#playerPassword').on({
		focus:function (){
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
			}
		}
	});
	$('#playerPassword1').on({
		focus:function (){
			$('#playerPassword1+span').text('');
		},
		blur:function (){
			var playerPassword = $('#playerPassword').val();
			var playerPassword1 = $(this).val();
			
			if(playerPassword != playerPassword1){
				$('#playerPassword1+span').text('*密码不一致');
			}
		}
	});
	$('#playerName').on({
		focus:function (){
			$('#playerName+span').text('');
		},
		blur:function (){
			var playerName = $(this).val();
			if(playerName == ''){
				$('#playerName+span').text('*昵称不能为空');
			}else if(playerName.length > 20){
				$('#playerName+span').text('*不能超过20位');
			}
		}
	});
	$('#form1 input[value=" 注 册 "]').on('click', function (){
		setTimeout(function (){
			var message1 = $('#playerId+span').text();
			var message2 = $('#playerPassword+span').text();
			var message3 = $('#playerPassword1+span').text();
			var message4 = $('#playerName+span').text();
			if(message1 == '' && message2 == '' && message3 == '' && message4 == ''){
				$('#form1 input[value=" 注 册 "]').attr('type', 'submit');
				$('#form1 input[value=" 注 册 "]').click();
			}
		}, 300);
	});
	$('#form1 input[value=" 取 消 "]').on('click', function (){
		var ok = confirm('确认取消');
		if(ok){
			window.history.back();
		}
	});
	$('#form1 input[value=" 清 空 "]').on('click', function (){
		$('#playerId+span').text('*');
		$('#playerPassword+span').text('*');
		$('#playerPassword1+span').text('*');
		$('#playerName+span').text('*');
	});
});
$(function (){
	document.body.onselectstart = function (){
		return false;
	};
	showRegisterPage();
});