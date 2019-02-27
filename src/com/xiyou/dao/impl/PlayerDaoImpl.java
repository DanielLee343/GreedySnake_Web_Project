package com.xiyou.dao.impl;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.xiyou.dao.PlayerDao;
import com.xiyou.pojo.Player;
import com.xiyou.util.DBConnection;

public class PlayerDaoImpl implements PlayerDao{
	@Override
	public String getPlayerId(String sql, String playerId) {
		ResultSet rs = (ResultSet) DBConnection.execute(sql, playerId);
		
		try {
			if(rs.next()){
				playerId = rs.getString("playerId");
			}else{
				playerId = "";
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} finally{
			DBConnection.close();
			try {
				rs.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		
		return playerId;
	}

	@Override
	public Player getPlayerIdAndPlayerPassword(String sql, Player player) {
		ResultSet rs = (ResultSet) DBConnection.execute(sql, player.getPlayerId(), player.getPlayerPassword());
		
		try {
			if(rs.next()){
				String playerId = rs.getString("playerId");
				String playerPassword = rs.getString("playerPassword");
				player = new Player(playerId, playerPassword);
			}else{
				player = null;
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} finally{
			DBConnection.close();
			try {
				rs.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		
		return player;
	}

	@Override
	public Player getPlayer(String sql, String playerId, String playerPassword) {
		ResultSet rs = (ResultSet) DBConnection.execute(sql, playerId, playerPassword);
		Player player = null;
		
		try {
			if(rs.next()){
				String playerName = rs.getString("playerName");
				int pb = rs.getInt("pb");
				player = new Player(playerId, playerPassword, playerName, pb);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} finally{
			DBConnection.close();
			try {
				rs.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		
		return player;
	}

	@Override
	public int addPlayer(String sql, Player player) {
		int result = (Integer) DBConnection.execute(sql, player.getPlayerId(), player.getPlayerPassword(), player.getPlayerName(), player.getPb());
		DBConnection.close();
		return result;
	}

	@Override
	public int deletePlayer(String sql, String playerId) {
		int result = (Integer) DBConnection.execute(sql, playerId);
		DBConnection.close();
		return result;
	}

	@Override
	public int updatePlayer(String sql, Player player) {
		int result = (Integer) DBConnection.execute(sql, player.getPlayerPassword(), player.getPlayerName(), player.getPlayerId());
		DBConnection.close();
		return result;
	}

	@Override
	public List<Player> getPlayerList(String sql) {
		ResultSet rs = (ResultSet) DBConnection.execute(sql);
		Player player = null;
		List<Player> playerList = new ArrayList<Player>();
		
		try {
			while(rs.next()){
				String playerId = rs.getString("playerId");
				String playerPassword = rs.getString("playerPassword");
				String playerName = rs.getString("playerName");
				int pb = rs.getInt("pb");
				player = new Player(playerId, playerPassword, playerName, pb);
				playerList.add(player);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}finally{
			DBConnection.close();
			try {
				rs.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		
		return playerList;
	}

	@Override
	public int updatePlayerPb(String sql, Player player) {
		int result = (Integer) DBConnection.execute(sql, player.getPb(), player.getPlayerId());
		DBConnection.close();
		return result;
	}
}