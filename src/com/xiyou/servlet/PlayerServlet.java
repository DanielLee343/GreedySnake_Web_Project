package com.xiyou.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.Servlet;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.xiyou.factory.PlayerServiceFactory;
import com.xiyou.pojo.Player;
import com.xiyou.service.PlayerService;
import com.xiyou.util.HandleCharacter;

public final class PlayerServlet extends HttpServlet implements Servlet{
	private static final long serialVersionUID = 6737515178526266590L;
	private PlayerService ps = PlayerServiceFactory.getInstance();
	
	@Override
	public void service(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		HttpSession session = request.getSession();
		String method = request.getParameter("method");
		
		request.setCharacterEncoding("UTF-8");
		response.setCharacterEncoding("UTF-8");
		if("isPlayerIdExist".equals(method)){
			isPlayerIdExist(request, response);
		}else if("isLoginSuccess".equals(method)){
			isLoginSuccess(request, response);
		}else if("login".equals(method)){
			login(request, response, session);
		}else if("clear".equals(method)){
			clear(response, session);
		}else if("register".equals(method)){
			register(request, response, session);
		}else if("check".equals(method)){
			check(request, response, session);
		}else if("cancel".equals(method)){
			cancel(response, session);
		}else if("exit".equals(method)){
			exit(response, session);
		}else if("gameOver".equals(method)){
			gameOver(request, response, session);
		}
	}
	/**
	 * 判断账号是否存在
	 * @param playerId 账号
	 * @return 
	 */
	public void isPlayerIdExist(HttpServletRequest request, HttpServletResponse response){
		PrintWriter out = null;
		try {
			out = response.getWriter();
		} catch (IOException e) {
			e.printStackTrace();
		}
		String playerId = request.getParameter("playerId");
		boolean ok = ps.isPlayerIdExist(playerId);
		out.print(ok ? "success":"fail");
	}
	/**
	 * 判断能否登录
	 * @param player
	 * @return
	 */
	public void isLoginSuccess(HttpServletRequest request, HttpServletResponse response){
		PrintWriter out = null;
		try {
			out = response.getWriter();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		String playerId = request.getParameter("playerId");
		String playerPassword = request.getParameter("playerPassword");
		Player player = new Player(playerId, playerPassword);
		boolean ok = ps.isLoginSuccess(player);
		out.print(ok ? "success":"fail");
	}
	/**
	 * 登录
	 * @param request
	 * @param response
	 * @param session
	 */
	public void login(HttpServletRequest request, HttpServletResponse response, HttpSession session){
		String playerId = request.getParameter("playerId");
		String playerPassword = request.getParameter("playerPassword");
		Player player = ps.getPlayer(playerId, playerPassword);
		List<Player> playerList = ps.getPlayerList();
		
		session.setAttribute("player", player);
		session.setAttribute("playerId", playerId);
		session.setAttribute("playerList", playerList);
		try {
			response.sendRedirect("pages/main.jsp");
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	public void clear(HttpServletResponse response, HttpSession session){
		session.removeAttribute("playerId");
		try {
			response.sendRedirect("pages/login.jsp");
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	/**
	 * 注册
	 * @param request
	 * @param response
	 * @param session
	 */
	public void register(HttpServletRequest request, HttpServletResponse response, HttpSession session){
		String playerId = request.getParameter("playerId");
		String playerPassword = request.getParameter("playerPassword");
		String playerName = request.getParameter("playerName");
		playerName = HandleCharacter.translate(playerName);
		int pb = 0;
		Player player = new Player(playerId, playerPassword, playerName, pb);
		
		ps.addPlayer(player);
		session.setAttribute("playerId", playerId);
		try {
			response.sendRedirect("pages/login.jsp");
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	/**
	 * 查看玩家资料
	 * @param request
	 * @param response
	 * @param session
	 */
	public void check(HttpServletRequest request, HttpServletResponse response, HttpSession session){
		Player player = (Player) session.getAttribute("player");
		String playerId = request.getParameter("playerId");
		String playerPassword = request.getParameter("playerPassword");
		String playerName = request.getParameter("playerName");
		playerName = HandleCharacter.translate(playerName);
		int pb = Integer.parseInt(request.getParameter("pb"));
		List<Player> playerList = null;
		
		if(!(player.getPlayerPassword().equals(playerPassword) && player.getPlayerName().equals(playerName))){
			Player player1 = new Player(playerId, playerPassword, playerName, pb);
			ps.updatePlayer(player1);
			playerList = ps.getPlayerList();
			session.setAttribute("player", player1);
			session.setAttribute("playerList", playerList);
		}
		
		try {
			response.sendRedirect("pages/main.jsp");
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	/**
	 * 注销
	 * @param response
	 * @param session
	 */
	public void cancel(HttpServletResponse response, HttpSession session){
		Player player = (Player) session.getAttribute("player");
		String playerId = player.getPlayerId();
		
		ps.deletePlayer(playerId);
		session.removeAttribute("player");
		session.removeAttribute("playerId");
		session.removeAttribute("playerList");
		try {
			response.sendRedirect("pages/login.jsp");
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	/**
	 * 退出
	 * @param response
	 * @param session
	 */
	public void exit(HttpServletResponse response, HttpSession session){
		session.removeAttribute("player");
		session.removeAttribute("playerList");
		try {
			response.sendRedirect("pages/login.jsp");
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	public void gameOver(HttpServletRequest request, HttpServletResponse response, HttpSession session){
		int score = Integer.parseInt(request.getParameter("score"));
		Player player = (Player) session.getAttribute("player");
		List<Player> playerList = null;

		if(score > player.getPb()){
			player.setPb(score);
			ps.updatePlayerPb(player);
			playerList = ps.getPlayerList();
			session.setAttribute("player", player);
			session.setAttribute("playerList", playerList);
		}
		try {
			response.sendRedirect("pages/main.jsp");
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}