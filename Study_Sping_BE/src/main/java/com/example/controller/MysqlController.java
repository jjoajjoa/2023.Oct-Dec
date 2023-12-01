package com.example.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.dao.MysqlDAO;

@RestController
public class MysqlController {
	@Autowired
	MysqlDAO dao;

	@GetMapping("/now")
	public String now() {
		return dao.now();
	}
}