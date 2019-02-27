package com.xiyou.util;

import java.io.UnsupportedEncodingException;

public final class HandleCharacter {
	public static String translate(String str){
		byte[] b = null;
		
		if(str == null){
			str = "";
		}
		try {
			b = str.getBytes("ISO-8859-1");
			str = new String(b, "UTF-8");
		} catch (UnsupportedEncodingException e1) {
			e1.printStackTrace();
		}
		
		return str;
	}
}