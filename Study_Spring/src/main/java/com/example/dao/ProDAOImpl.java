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
	String namespace="com.example.mapper.ProfessorMapper";
	
	@Override
	public List<HashMap<String, Object>> list() {
		return session.selectList(namespace + ".list");
	}

	@Override
	public int code() {
		return session.selectOne(namespace + ".code");
	}

	@Override
	public void insert(ProVO vo) {
		session.insert(namespace + ".insert", vo);
	}

	@Override
	public HashMap<String, Object> read(String pcode) {
		return session.selectOne(namespace + ".read", pcode);
	}

	@Override
	public List<HashMap<String, Object>> stuList(String pcode) {
		return session.selectList(namespace + ".stu_list", pcode);
	}

	@Override
	public List<HashMap<String, Object>> couList(String pcode) {
		return session.selectList(namespace + ".cou_list", pcode);
	}

	@Override
	public void update(ProVO vo) {
		session.update(namespace + ".update", vo);
	}

	@Override
	public List<HashMap<String, Object>> slist(QueryVO vo) {
		vo.setStart((vo.getPage()-1) * vo.getSize());
		return session.selectList(namespace + ".slist", vo);
	}

	@Override
	public int total(QueryVO vo) {
		return session.selectOne(namespace + ".total", vo);
	}
}






