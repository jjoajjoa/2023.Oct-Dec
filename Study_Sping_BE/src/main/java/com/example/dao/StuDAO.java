package com.example.dao;

import java.util.*;

import com.example.domain.EnrollVO;

public interface StuDAO {
   public List<HashMap<String, Object>> list();
   public List<HashMap<String, Object>> listEnroll(String scode);
   public int check(EnrollVO vo);
   public void insertEnroll(EnrollVO vo);
   public void deleteEnroll(EnrollVO vo);
}