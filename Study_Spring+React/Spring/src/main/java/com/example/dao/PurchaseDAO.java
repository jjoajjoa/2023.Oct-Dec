package com.example.dao;

import java.util.*;

import com.example.domain.OrderVO;
import com.example.domain.PurchaseVO;
import com.example.domain.UserVO;

public interface PurchaseDAO {
	public void insertPurchase(PurchaseVO vo);
	public void insertOrder(OrderVO vo);
	public List<HashMap<String, Object>> listPurchase(UserVO vo);
	public int totalPurchase(String uid);
	public List<HashMap<String, Object>> listOrders(String oid);
}
