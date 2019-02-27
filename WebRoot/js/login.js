/**
 * 显示登录页面
 */
function showLoginPage(){
	var client = getClientWidthAndHeight();
	var loginFrameLeft = (client.w-parseInt($('#form1').css('width')))/2;
	var loginFrameTop = 220;
	//设置游戏区的宽和高
	setCanvasSize($('#can1'), client);
	//设置登录框的位置
	setFrameLocation($('#form1'), loginFrameLeft, loginFrameTop);
}
/**
 * 登录操作
 */
$(function (){
	$('#playerId').on({
		focus:function (){
			$('#playerId+span').text('');
		},
		blur:function (){
			var playerId = $(this).val();
			if(playerId == ''){
				$('#playerId+span').text('*账号不能为空');
			}else{
				$.ajax({
					url:'PlayerServlet?method=isPlayerIdExist',
					data:{'playerId':playerId},
					type:'post',
					dataType:'text',
					success:function (result){
						if(result == 'success'){
							$('#playerId+span').text('');
						}else{
							$('#playerId+span').text('*该账号不存在');
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
			if(playerPassword == ''){
				$('#playerPassword+span').text('*密码不能为空');
			}else{
				var playerId = $('#playerId').val();
				$.ajax({
					url:'PlayerServlet?method=isLoginSuccess',
					data:{'playerId':playerId, 'playerPassword':playerPassword},
					type:'post',
					dataType:'text',
					success:function (result){
						if(result == 'success'){
							$('#playerPassword+span').text('');
						}else{
							$('#playerPassword+span').text('*密码不正确');
						}
					},
					error:function (){
						alert('请求失败');
					}
				});
			}
		}
	});
	$('#form1 input[value=" 登 录 "]').on('click', function (){
		setTimeout(function (){
			var message1 = $('#playerId+span').text();
			var message2 = $('#playerPassword+span').text();
			if(message1 == '' && message2 == ''){
				$('#form1 input[value=" 登 录 "]').attr('type', 'submit');
				$('#form1 input[value=" 登 录 "]').click();
			}
		}, 300);
	});
	$('#form1 input[value=" 注 册 "]').on('click', function (){
		window.location.href = 'pages/register.jsp';
	});
	$('#form1 input[value=" 清 空 "]').on('click', function (){
		$('#playerId+span').text('*');
		$('#playerPassword+span').text('*');
		window.location.href = 'PlayerServlet?method=clear';
	});
});
$(function (){
	document.body.onselectstart = function (){
		return false;
	};
	showLoginPage();
});