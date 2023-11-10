package com.example;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.example.dao.MysqlDAO;

@SpringBootTest
class Web01ApplicationTests {

	@Test
	void contextLoads() {
	}
	
	@Autowired
	MysqlDAO dao;
	
	@Test
	void now() {
		System.out.println("현재 시각: " + dao.now());
		
	}

}
