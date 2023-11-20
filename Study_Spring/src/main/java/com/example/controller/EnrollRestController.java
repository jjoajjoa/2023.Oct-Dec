package com.example.controller;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.dao.EnrollDAO;
import com.example.domain.EnrollVO;
import com.example.service.EnrollService;

@RestController
@RequestMapping("/enroll")
public class EnrollRestController {
	@Autowired
	EnrollService service;

	@Autowired
	EnrollDAO dao;

	@PostMapping("/delete")
	public void delete(@RequestBody EnrollVO vo) {
		service.delete(vo);
	}

	@PostMapping("/insert")
	public void insert(@RequestBody EnrollVO vo) {
		service.insert(vo);
	}

	@GetMapping("/read.json")
	public HashMap<String, Object> read(EnrollVO vo) {
		return dao.read(vo);
	}
	
	@PostMapping("/grade")
	public void grade(@RequestBody EnrollVO vo) {
		dao.grade(vo);
	}
}