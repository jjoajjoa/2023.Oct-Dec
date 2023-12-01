package com.example.dao;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.example.domain.EnrollVO;

@Repository
public class StuDAOImpl implements StuDAO {
	@Autowired
	SqlSession session;

	String namespace = "com.example.mapper.StuMapper";

	@Override
	public List<HashMap<String, Object>> list() {
		return session.selectList(namespace + ".list");
	}

	@Override
	public List<HashMap<String, Object>> listEnroll(String scode) {
		return session.selectList(namespace + ".list_enroll", scode);
	}

	@Override
	public int check(EnrollVO vo) {
		return session.selectOne(namespace + ".check", vo);
	}

	@Override
	public void insertEnroll(EnrollVO vo) {
		session.insert(namespace + ".insert_enroll", vo);
	}

	@Override
	public void deleteEnroll(EnrollVO vo) {
		session.delete(namespace + ".delete_enroll", vo);
	}

}