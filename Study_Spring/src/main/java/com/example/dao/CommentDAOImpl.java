package com.example.dao;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.example.domain.CommentVO;

@Repository
public class CommentDAOImpl implements CommentDAO{
	@Autowired
	SqlSession session;
	String namespace="com.example.mapper.CommentMapper";
	
	@Override
	public List<HashMap<String, Object>> list(int pid, int page, int size) {
		HashMap<String,Object> map=new HashMap<>();
		map.put("pid", pid);
		map.put("start", (page-1)*size);
		map.put("size", size);
		return session.selectList(namespace + ".list", map);
	}

	@Override
	public int total(int pid) {
		return session.selectOne(namespace + ".total", pid);
	}

	@Override
	public void insert(CommentVO vo) {
		session.insert(namespace + ".insert", vo);
	}

	@Override
	public void delete(int cid) {
		session.delete(namespace + ".delete", cid);
	}

	@Override
	public void update(CommentVO vo) {
		session.update(namespace + ".update", vo);
	}

	@Override
	public CommentVO read(int cid) {
		return session.selectOne(namespace + ".read", cid);
	}
}
