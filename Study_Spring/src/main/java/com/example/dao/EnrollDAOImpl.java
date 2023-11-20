package com.example.dao;

import java.util.HashMap;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.example.domain.EnrollVO;

@Repository
public class EnrollDAOImpl implements EnrollDAO {
	@Autowired
	SqlSession session;
	String namespace = "com.example.mapper.EnrollMapper";

	@Override
	public void delete(EnrollVO vo) {
		session.delete(namespace + ".delete", vo);
	}

	@Override
	public void persons(String lcode, int count) {
		HashMap<String, Object> map = new HashMap<>();
		map.put("count", count);
		map.put("lcode", lcode);
		session.update(namespace + ".persons", map);
	}

	@Override
	public void insert(EnrollVO vo) {
		session.insert(namespace + ".insert", vo);
	}

	@Override
	public HashMap<String, Object> read(EnrollVO vo) {
		return session.selectOne(namespace + ".read", vo);
	}

	@Override
	public void grade(EnrollVO vo) {
		session.update(namespace + ".grade", vo);
	}
}