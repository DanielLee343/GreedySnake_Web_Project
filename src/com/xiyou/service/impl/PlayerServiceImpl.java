package com.xiyou.service.impl;

import java.util.List;

import com.xiyou.dao.PlayerDao;
import com.xiyou.factory.PlayerDaoFactory;
import com.xiyou.pojo.Player;
import com.xiyou.service.PlayerService;

public class PlayerServiceImpl implements PlayerService{
	private PlayerDao pd = PlayerDaoFactory.getInstance();
	@Override
	public boolean isPlayerIdExist(String playerId) {
		String sql = "select playerId from player where playerId = ?";
		String result = pd.getPlayerId(sql, playerId);
		
		return playerId.equals(result);
	}
	
	@Override
	public boolean isLoginSuccess(Player player) {
		String sql = "select playerId, playerPassword from player where playerId = ? and playerPassword = ?";
		return pd.getPlayerIdAndPlayerPassword(sql, player) != null;
	}

	@Override
	public Player getPlayer(Player player) {
		return getPlayer(player.getPlayerId(), player.getPlayerPassword());
	}

	@Override
	public Player getPlayer(String playerId, String playerPassword) {
		String sql = "select playerId, playerPassword, playerName, pb from player where playerId = ? and playerPassword = ?";
		return pd.getPlayer(sql, playerId, playerPassword);
	}

	@Override
	public boolean addPlayer(Player player) {
		String sql = "insert into player(playerId, playerPassword, playerName, pb) values(?, ?, ?, ?)";
		return pd.addPlayer(sql, player) > 0;
	}

	@Override
	public boolean deletePlayer(String playerId) {
		String sql = "delete from player where playerId = ?";
		return pd.deletePlayer(sql, playerId) > 0;
	}

	@Override
	public boolean updatePlayer(Player player) {
		String sql = "update player set playerPassword = ?, playerName = ? where playerId = ?";
		return pd.updatePlayer(sql, player) > 0;
	}

	@Override
	public List<Player> getPlayerList() {
		String sql = "select playerId, playerPassword, playerName, pb from player order by pb desc limit 0, 10;";
		return pd.getPlayerList(sql);
	}

	@Override
	public boolean updatePlayerPb(Player player) {
		String sql = "update player set pb = ? where playerId = ?";
		return pd.updatePlayerPb(sql, player) > 0;
	}
}