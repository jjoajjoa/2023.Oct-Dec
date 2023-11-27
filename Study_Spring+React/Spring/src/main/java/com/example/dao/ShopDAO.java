package com.example.dao;

import com.example.domain.QueryVO;
import com.example.domain.ShopVO;
import java.util.*;

public interface ShopDAO {
	public void insert(ShopVO vo);

	public int check(String productId);

	public List<HashMap<String, Object>> list(QueryVO vo);

	public int total(QueryVO vo);

	public void delete(int pid);

	public HashMap<String, Object> read(int pid);

	public void update(ShopVO vo);

	public void image(ShopVO vo);
	
	
	public void viewcnt(int pid);
	public HashMap<String, Object> read(int pid, String uid);
	
	public void heart(int pid, String uid);
	public void delete_heart(int pid, String uid);
	public void update_heart(int pid, int amount);
	
}
