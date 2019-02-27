/**
 * 获得可视区窗口的宽和高
 * @returns 可视区窗口的信息
 */
function getClientWidthAndHeight(){
	//获得可视区的宽和高
	var clientWidth = $(window).width();
	var clientHeight = $(window).height();
	
	return {w:clientWidth, h:clientHeight};
}
/**
 * 设置游戏区的尺寸
 * @param 游戏区对象
 * @param 可视区
 */
function setCanvasSize($canvas, client){
	//设置游戏区的宽和高
	$canvas.width(client.w);
	$canvas.height(client.h);
}
/**
 * 设置表单框的位置
 * @param $form
 * @param left
 * @param top
 */
function setFrameLocation($form, left, top){
	$form.css({'left':left, 'top':top});
}