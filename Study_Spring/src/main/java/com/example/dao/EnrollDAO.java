package com.example.dao;

public interface EnrollDAO {
	public void delete(String scode, String lcode);
	public void persons(String lcode, int count);
	public void insert(String scode, String lcode);
}
