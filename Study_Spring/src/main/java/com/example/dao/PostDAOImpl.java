package com.example.dao;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.example.domain.PostVO;

@Repository
public class PostDAOImpl implements PostDAO {
   @Autowired
   SqlSession session;
   String namespace="com.example.mapper.MysqlMapper";

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

}