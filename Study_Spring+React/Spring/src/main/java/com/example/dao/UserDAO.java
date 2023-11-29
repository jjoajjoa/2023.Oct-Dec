package com.example.dao;

import java.util.HashMap;

import com.example.domain.UserVO;

public interface UserDAO {
	public HashMap<String, Object> read(String uid);
	public void update(UserVO vo);
}
