package com.xiyou.factory;

import com.xiyou.service.PlayerService;
import com.xiyou.service.impl.PlayerServiceImpl;

public final class PlayerServiceFactory {
	private static PlayerService playerService = new PlayerServiceImpl();
	
	private PlayerServiceFactory(){
		super();
	}
	
	public static PlayerService getInstance(){
		return playerService;
	}
}