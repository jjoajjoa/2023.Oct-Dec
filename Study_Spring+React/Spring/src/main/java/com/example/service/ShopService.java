package com.example.service;

import java.util.HashMap;

import com.example.domain.QueryVO;
import com.example.domain.ShopVO;

public interface ShopService {
	public void insert(ShopVO vo);
	public HashMap<String,Object> list(QueryVO vo);
}
