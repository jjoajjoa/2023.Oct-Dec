package com.example.service;

import com.example.domain.CommentVO;

public interface CommentService {
	public void insert(CommentVO vo);
	public void delete(int cid);
}
