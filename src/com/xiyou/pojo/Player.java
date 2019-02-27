package com.xiyou.pojo;
/**
 * 玩家类
 * @author gua
 *
 */
public final class Player {
	private String playerId;	//账号
	private String playerPassword;	//密码
	private String playerName;	//昵称
	private int pb;	//个人最好成绩
	
	public Player() {
		super();
	}
	
	public Player(String playerId) {
		super();
		this.playerId = playerId;
	}

	public Player(String playerId, String playerPassword) {
		super();
		this.playerId = playerId;
		this.playerPassword = playerPassword;
	}
	
	public Player(String playerId, String playerPassword, String playerName) {
		super();
		this.playerId = playerId;
		this.playerPassword = playerPassword;
		this.playerName = playerName;
	}

	public Player(String playerId, String playerPassword, String playerName,
			int pb) {
		super();
		this.playerId = playerId;
		this.playerPassword = playerPassword;
		this.playerName = playerName;
		this.pb = pb;
	}

	public String getPlayerId() {
		return playerId;
	}

	public void setPlayerId(String playerId) {
		this.playerId = playerId;
	}

	public String getPlayerPassword() {
		return playerPassword;
	}

	public void setPlayerPassword(String playerPassword) {
		this.playerPassword = playerPassword;
	}

	public String getPlayerName() {
		return playerName;
	}

	public void setPlayerName(String playerName) {
		this.playerName = playerName;
	}

	public int getPb() {
		return pb;
	}

	public void setPb(int pb) {
		this.pb = pb;
	}

	@Override
	public String toString() {
		return "Player [playerId=" + playerId + ", playerPassword="
				+ playerPassword + ", playerName=" + playerName + ", pb=" + pb
				+ "]";
	}
}