package com.example.controller;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.dao.StuDAO;
import com.example.domain.EnrollVO;
import com.example.service.StuService;

@RestController
@RequestMapping("/stu")
public class StuRestController {
   @Autowired
   StuDAO dao;
   
   @Autowired
   StuService service;
   
   @GetMapping("/list.json")
   public List<HashMap<String, Object>> list(){
      return dao.list();
   }
   
   @GetMapping("/enroll/list.json/{scode}")//localhost:8080/stu/enroll/list.json/학번
   public List<HashMap<String, Object>> listEnroll(@PathVariable("scode") String scode){
      return dao.listEnroll(scode);
   }
   
   @GetMapping("/enroll/check")
   public int check(EnrollVO vo) {
	   return dao.check(vo);
   }
   
   @PostMapping("/enroll/insert")
   public void enrollInsert(@RequestBody EnrollVO vo) {
	   service.insertEnroll(vo);
   }
   
   @PostMapping("/enroll/delete")
   public void enrollDelete(@RequestBody EnrollVO vo) {
	   service.deleteEnroll(vo);
   }
}