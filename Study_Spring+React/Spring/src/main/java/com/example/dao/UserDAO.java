package com.example.dao;

import java.util.HashMap;

public interface UserDAO {
	public HashMap<String, Object> read(String uid);
}
