package com.example.controller;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.dao.CouDAO;
import com.example.domain.QueryVO;

@RestController
@RequestMapping("/cou")
public class CouRestController {
   @Autowired
   CouDAO dao;
   
   @GetMapping("/list.json")
   public HashMap<String,Object> list(QueryVO vo){
      HashMap<String,Object> map=new HashMap<String,Object>();
      map.put("list", dao.list(vo));
      map.put("total", dao.total(vo));
      return map;
   }
   
   @GetMapping("/read.json")
   public HashMap<String,Object> read(String lcode){
      return dao.read(lcode);
   }
   
   @GetMapping("/enroll.json")
   public List<HashMap<String,Object>> enroll(String lcode){
      return dao.enroll(lcode);
   }
   
   @GetMapping("/graph.json")
   public List<HashMap<String,Object>> graph(){
      return dao.graph();
   }
}