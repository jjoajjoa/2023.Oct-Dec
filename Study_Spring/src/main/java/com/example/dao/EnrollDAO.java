package com.example.dao;

import java.util.HashMap;

import com.example.domain.EnrollVO;

public interface EnrollDAO {
   public void delete(EnrollVO vo);
   public void persons(String lcode, int count);
   public void insert(EnrollVO vo);
   public HashMap<String, Object> read(EnrollVO vo);  
   public void grade(EnrollVO vo);
}