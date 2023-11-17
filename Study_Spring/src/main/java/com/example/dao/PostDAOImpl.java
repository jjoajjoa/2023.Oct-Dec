package com.example.dao;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.example.domain.PostVO;

@Repository
public class PostDAOImpl implements PostDAO{
	@Autowired
	SqlSession session;
	String namespace="com.example.mapper.PostMapper";
	
	@Override
	public List<HashMap<String, Object>> list() {
		return session.selectList(namespace + ".list");
	}

	@Override
	public HashMap<String, Object> read(int pid) {
		return session.selectOne(namespace + ".read", pid);
	}

	@Override
	public void insert(PostVO vo) {
		session.insert(namespace + ".insert", vo);
	}

	@Override
	public void delete(int pid) {
		session.delete(namespace + ".delete", pid);
	}

	@Override
	public void update(PostVO vo) {
		session.update(namespace + ".update", vo);
	}

	@Override
	public List<HashMap<String, Object>> list1(int page, int size, String key, String query) {
		HashMap<String,Object> map=new HashMap<>();
		map.put("start", (page-1)*size);
		map.put("size", size);
		map.put("key", key);
		map.put("query", query);
		return session.selectList(namespace + ".list1", map);
	}

	@Override
	public int total(String key, String query) {
		HashMap<String,Object> map=new HashMap<>();
		map.put("key", key);
		map.put("query", query);
		return session.selectOne(namespace + ".total", map);
	}
	
	@Override
	public void viewcnt(int pid) {
		session.update(namespace + ".viewcnt", pid);
	}

	@Override
	public void commcnt(int pid, int cnt) {
		HashMap<String,Object> map=new HashMap<>();
		map.put("pid", pid);
		map.put("cnt", cnt);
		session.update(namespace + ".commcnt", map);
	}
}







