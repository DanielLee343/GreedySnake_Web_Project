package com.xiyou.factory;

import com.xiyou.dao.PlayerDao;
import com.xiyou.dao.impl.PlayerDaoImpl;

public final class PlayerDaoFactory {
	private static PlayerDao playerDao = new PlayerDaoImpl();
	
	private PlayerDaoFactory(){
		super();
	}
	
	public static PlayerDao getInstance(){
		return playerDao;
	}
}