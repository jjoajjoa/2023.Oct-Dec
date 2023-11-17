package com.example.dao;
import java.util.*;

import com.example.domain.PostVO;

public interface PostDAO {
	public List<HashMap<String,Object>> list();
	public HashMap<String,Object> read(int pid);
	public void insert(PostVO vo);
	public void delete(int pid);
	public void update(PostVO vo);
	public List<HashMap<String,Object>> list1(int page, int size, String key, String query);
	public int total(String key, String query);
	public void viewcnt(int pid);
	public void commcnt(int pid, int cnt);
}
