package com.example.dao;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class MysqlDAOImpl implements MysqlDAO {
	@Autowired //자동으로 주입해줘~~
	SqlSession session; //DB 연결 정보가 들어있음
	String namespace="com.example.mapper.MysqlMapper";
	
	@Override
	public String now() {
		return session.selectOne(namespace + ".now");
	}

}
