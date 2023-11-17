package com.example.controller;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.dao.StuDAO;
import com.example.domain.QueryVO;

@RestController
@RequestMapping("/stu")
public class StuRestController {
	@Autowired
	StuDAO dao;

	@GetMapping("/list.json")
	public HashMap<String, Object> list(QueryVO vo) {
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("list", dao.list(vo));
		map.put("total", dao.total(vo));
		return map;
	}

	@GetMapping("/total")
	public int total(QueryVO vo) {
		return dao.total(vo);
	}

	@GetMapping("/read.json")
	public HashMap<String, Object> read(String scode) {
		return dao.read(scode);
	}
	
	@GetMapping("/enroll.json")
	public List<HashMap<String, Object>> enroll(String scode) {
		return dao.enroll(scode);
	}
}
