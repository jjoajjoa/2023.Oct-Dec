package com.example.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.dao.CommentDAO;
import com.example.dao.PostDAO;
import com.example.domain.CommentVO;

@Service
public class CommentServiceImpl implements CommentService{
	@Autowired
	CommentDAO cdao;
	
	@Autowired
	PostDAO pdao;
	
	@Transactional
	@Override
	public void insert(CommentVO vo) {
		cdao.insert(vo);
		pdao.commcnt(vo.getPid(), 1);
	}

	@Transactional
	@Override
	public void delete(int cid) {
		CommentVO vo=cdao.read(cid);
		cdao.delete(cid);
		pdao.commcnt(vo.getPid(), -1);
	}

}
