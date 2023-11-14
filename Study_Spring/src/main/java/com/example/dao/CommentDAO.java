package com.example.dao;

import java.util.HashMap;
import java.util.List;

import com.example.domain.CommentVO;

public interface CommentDAO {
	public List<HashMap<String, Object>> list(int pid, int page, int size);
	public int total(int pid);
	public void insert(CommentVO vo);
	public void delete(int cid);
	public void update(CommentVO vo);
	public CommentVO read(int cid);
}
