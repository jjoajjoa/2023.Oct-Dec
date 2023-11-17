package com.example.dao;
import java.util.*;

import com.example.domain.ProVO;
import com.example.domain.QueryVO;

public interface ProDAO {
	public List<HashMap<String,Object>> list();
	public int code();
	public void insert(ProVO vo);
	public HashMap<String,Object> read(String pcode);
	public List<HashMap<String,Object>> stuList(String pcode);
	public List<HashMap<String,Object>> couList(String pcode);
	public void update(ProVO vo);
	public List<HashMap<String,Object>> slist(QueryVO vo);
	public int total(QueryVO vo);
}
