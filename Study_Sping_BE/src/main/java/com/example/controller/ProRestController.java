package com.example.controller;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.dao.ProDAO;
import com.example.domain.ProVO;
import com.example.domain.QueryVO;

@RestController
@RequestMapping("/pro")
public class ProRestController {
	@Autowired
	ProDAO dao;
	
	@GetMapping("/read.json/{pcode}")
	public HashMap<String,Object> read(@PathVariable("pcode") String pcode){
		return dao.read(pcode);
	}
	
	@GetMapping("/list.json")
	public HashMap<String,Object> list(QueryVO vo){
		HashMap<String,Object> map=new HashMap<String,Object>();
		map.put("list", dao.list(vo));
		map.put("total", dao.total());
		return map;
	}
	
	@PostMapping("/insert")
	public void insert(@RequestBody ProVO vo) {
		dao.insert(vo);
	}
	
	@PostMapping("/delete/{pcode}")
	public void delete(@PathVariable("pcode") String pcode) {
		System.out.println("..............." + pcode);
		dao.delete(pcode);
	}
	
	@PostMapping("/update")
	public void update(@RequestBody ProVO vo) {
		dao.update(vo);
	}
}