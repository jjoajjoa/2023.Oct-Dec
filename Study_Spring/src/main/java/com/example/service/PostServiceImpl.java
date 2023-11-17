package com.example.service;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.dao.PostDAO;

@Service
public class PostServiceImpl implements PostService{
	@Autowired
	PostDAO dao;
	
	@Transactional
	@Override
	public HashMap<String, Object> read(int pid) {
		dao.viewcnt(pid);
		return dao.read(pid);
	}

}
