package com.xiyou.dao;

import java.util.List;

import com.xiyou.pojo.Player;

public interface PlayerDao {
	/**
	 * 获得该账号
	 * @param sql
	 * @param playerId 账号
	 * @return 账号
	 */
	String getPlayerId(String sql, String playerId);
	/**
	 * 获得该账号和密码
	 * @param sql
	 * @param player
	 * @return
	 */
	Player getPlayerIdAndPlayerPassword(String sql, Player player);
	/**
	 * 根据账号和密码获得玩家对象
	 * @param sql
	 * @param playerId
	 * @param playerPassword
	 * @return
	 */
	Player getPlayer(String sql, String playerId, String playerPassword);
	/**
	 * 添加玩家
	 * @param sql
	 * @param player
	 * @return
	 */
	int addPlayer(String sql, Player player);
	/**
	 * 删除玩家
	 * @param sql
	 * @param playerId
	 * @return
	 */
	int deletePlayer(String sql, String playerId);
	/**
	 * 修改玩家
	 * @param sql
	 * @param player
	 * @return
	 */
	int updatePlayer(String sql, Player player);
	/**
	 * 获得排行榜
	 * @param sql
	 * @return
	 */
	List<Player> getPlayerList(String sql);
	
	int updatePlayerPb(String sql, Player player);
}