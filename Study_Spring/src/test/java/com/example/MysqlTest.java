package com.example;


import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;


import com.example.dao.PostDAO;
import com.example.dao.ProDAO;
import com.example.dao.StuDAO;
import com.example.dao.UserDAO;
import com.example.domain.QueryVO;

@SpringBootTest
public class MysqlTest {
	@Autowired
	StuDAO dao;
	
	@Test
	public void list() {
		QueryVO vo = new QueryVO();
		vo.setPage(3);
		vo.setSize(3);
		dao.list(vo);
	}
	
}
