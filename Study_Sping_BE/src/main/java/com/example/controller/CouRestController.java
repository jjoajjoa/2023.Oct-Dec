package com.example.controller;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.dao.CouDAO;

@RestController
@RequestMapping("/cou")
public class CouRestController {
	@Autowired
	CouDAO dao;

	@GetMapping("/list.json")
	public List<HashMap<String, Object>> list() {
		return dao.list();
	}
}
