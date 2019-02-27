package com.xiyou.test;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.junit.Test;

import com.xiyou.pojo.Player;
import com.xiyou.util.DBConnection;

public class Demo {
	@Test
	public void add(){
		String sql = "insert into player(playerId, playerPassword, playerName, pb) values(?, ?, ?, ?)";
		Player player = new Player("xiaoyi", "3322", "yiyi", 7981);
		int result = (Integer) DBConnection.execute(sql, player.getPlayerId(), player.getPlayerPassword(), player.getPlayerName(), player.getPb());
		System.out.println(result > 0 ? "��ӳɹ�":"���ʧ��");
		DBConnection.close();
	}
	@Test
	public void delete(){
		String sql = "delete from player where playerId = ?";
		Player player = new Player("xiaoyi");
		int result = (Integer) DBConnection.execute(sql, player.getPlayerId());
		System.out.println(result > 0 ? "ɾ��ɹ�":"ɾ��ʧ��");
		DBConnection.close();
	}
	@Test
	public void update(){
		String sql = "update player set playerPassword = ?, playerName = ?, pb = ? where playerId = ?";
		Player player = new Player("xiaoliu", "666", "leo", 666);
		int result = (Integer) DBConnection.execute(sql, player.getPlayerPassword(), player.getPlayerName(), player.getPb(), player.getPlayerId());
		System.out.println(result > 0 ? "�޸ĳɹ�":"�޸�ʧ��");
		DBConnection.close();
	}
	@Test
	public void getPlayerList(){
		String sql = "select playerId, playerPassword, playerName, pb from player";
		Player player = null;
		List<Player> playerList = new ArrayList<Player>();
		ResultSet rs = (ResultSet) DBConnection.execute(sql);

		try {
			while(rs.next()){
				String playerId = rs.getString(1);
				String playerPassword = rs.getString(2);
				String playerName = rs.getString(3);
				int pb = rs.getInt(4);
				player = new Player(playerId, playerPassword, playerName, pb);
				playerList.add(player);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} finally{
			try {
				rs.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
			DBConnection.close();
		}
		for(int i = 0; i < playerList.size(); i++){
			System.out.println(playerList.get(i));
		}
	}
	@Test
	public void demo05(){
		String a = "nokia";
		String b = new String("nokia");
		
		System.out.println(a.equals(b));
	}
	@Test
	public void demo06(){
//		Connection con = DBConnection.getConnection();
//		System.out.println(con);
	}
}
