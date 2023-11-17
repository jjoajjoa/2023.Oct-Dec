package com.example.dao;

import java.util.*;

import com.example.domain.QueryVO;


public interface CouDAO {
	public List<HashMap<String, Object>> list(QueryVO vo);
	public int total(QueryVO vo);
	public HashMap<String, Object> read(String lcode);
	public List<HashMap<String, Object>> enroll(String lcode);
}
