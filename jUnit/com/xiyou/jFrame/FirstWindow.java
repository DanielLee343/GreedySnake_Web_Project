package com.xiyou.jFrame;

import java.util.Scanner;

import javax.swing.JFrame;

import org.junit.Test;

public class FirstWindow {
	@Test
	public void demo01(){
		Scanner input = new Scanner(System.in);
		JFrame j = new JFrame("我的第一个窗口编程");
		j.setSize(400, 300);
		j.setLocation(300, 300);
		j.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		j.setVisible(true);
		input.nextInt();
	}
	public static void main(String[] args) {
		new FirstWindow().demo01();
	}
}
