package com.example.dao;

import java.util.HashMap;
import java.util.List;

public interface CouDAO {
	public List<HashMap<String, Object>> list();
	public void updatePersons(String lcode, int amount);
}
