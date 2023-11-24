package com.example.dao;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.example.domain.QueryVO;
import com.example.domain.ShopVO;

@Repository
public class ShopDAOImpl implements ShopDAO {
	@Autowired
	SqlSession session;
	String namespace = "com.example.mapper.ShopMapper";

	@Override
	public void insert(ShopVO vo) {
		session.insert(namespace + ".insert", vo);
	}

	@Override
	public int check(String productId) {
		return session.selectOne(namespace + ".check", productId);
	}

	@Override
	public List<HashMap<String, Object>> list(QueryVO vo) {
		vo.setStart((vo.getPage() - 1) * vo.getSize());
		return session.selectList(namespace + ".list", vo);
	}

	@Override
	public int total(QueryVO vo) {
		return session.selectOne(namespace + ".total", vo);
	}

	@Override
	public void delete(int pid) {
		session.delete(namespace + ".delete", pid);
	}

	@Override
	public HashMap<String, Object> read(int pid) {
		return session.selectOne(namespace + ".read", pid);
	}

	@Override
	public void update(ShopVO vo) {
		session.update(namespace + ".update", vo);
	}

	@Override
	public void image(ShopVO vo) {
		session.update(namespace + ".image", vo);
	}
}
