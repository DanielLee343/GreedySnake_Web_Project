package com.xiyou.util;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
/**
 * 数据库连接类
 * @author gua
 *
 */
public final class DBConnection {
	private final static String url = "jdbc:mysql://localhost:3306/snake?useUnicode=true&characterEncoding=UTF8";
	private final static String username = "root";
	private final static String password = "";
	private static Connection con = null;
	private static PreparedStatement ps = null;
	
	private DBConnection(){
		super();
	}
	/**
	 * 获得连接对象
	 */
	private static Connection getConnection(){
		try {
			Class.forName("com.mysql.jdbc.Driver");
			con = DriverManager.getConnection(url, username, password);
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return con;
	}
	/**
	 * 创建并执行sql语句然后返回对应的结果
	 * @param sql
	 * @param para
	 * @return
	 */
	public static Object execute(String sql, Object... para){
		Object obj = null;
		
		try {
			getConnection();
			ps = con.prepareStatement(sql);
			for(int i = 0; i < para.length; i++){
				ps.setObject(i+1, para[i]);
			}
			if(ps.execute()){
				obj = ps.getResultSet();
			}else{
				obj = ps.getUpdateCount();
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return obj;
	}
	/**
	 * 关闭对象
	 */
	public static void close(){
		try {
			if(con != null && !con.isClosed()){
				con.close();
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		try {
			if(ps != null && !ps.isClosed()){
				ps.close();
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
}