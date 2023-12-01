package com.example.dao;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.example.domain.ProVO;
import com.example.domain.QueryVO;

@Repository
public class ProDAOImpl implements ProDAO{
	@Autowired
	SqlSession session;
	String namespace="com.example.mapper.ProMapper";
	
	@Override
	public List<HashMap<String, Object>> list(QueryVO vo) {
		return session.selectList(namespace + ".list", vo);
	}

	@Override
	public int total() {
		return session.selectOne(namespace + ".total");
	}

	@Override
	public void insert(ProVO vo) {
		session.insert(namespace + ".insert", vo);
	}

	@Override
	public void delete(String pcode) {
		session.delete(namespace + ".delete", pcode);
	}

	@Override
	public HashMap<String, Object> read(String pcode) {
		return session.selectOne(namespace + ".read", pcode);
	}

	@Override
	public void update(ProVO vo) {
		session.update(namespace + ".update", vo);
	}
}