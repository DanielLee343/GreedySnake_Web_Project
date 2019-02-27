package com.xiyou.service;

import java.util.List;

import com.xiyou.pojo.Player;

public interface PlayerService {
	/**
	 * 判断账号是否存在
	 * @param playerId 账号
	 * @return
	 */
	boolean isPlayerIdExist(String playerId);
	/**
	 * 判断能否登录
	 * @param player
	 * @return
	 */
	boolean isLoginSuccess(Player player);
	/**
	 * 获得玩家对象
	 * @param player
	 * @return
	 */
	Player getPlayer(Player player);
	/**
	 * 根据账号和密码获得玩家对象
	 * @param playerId
	 * @param playerPassword
	 * @return
	 */
	Player getPlayer(String playerId, String playerPassword);
	/**
	 * 添加玩家
	 * @param player
	 * @return
	 */
	boolean addPlayer(Player player);
	/**
	 * 删除玩家
	 * @param playerId
	 */
	boolean deletePlayer(String playerId);
	/**
	 * 更新玩家
	 * @param player1
	 */
	boolean updatePlayer(Player player);
	/**
	 * 获得排行榜
	 * @return
	 */
	List<Player> getPlayerList();
	/**
	 * 更新玩家成绩
	 * @param player
	 * @return
	 */
	boolean updatePlayerPb(Player player);
}