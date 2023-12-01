package com.example.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.dao.CouDAO;
import com.example.dao.StuDAO;
import com.example.domain.EnrollVO;

@Service
public class StuServiceImpl implements StuService {
	@Autowired
	StuDAO sdao;
	
	@Autowired
	CouDAO cdao;
	
	@Transactional
	@Override
	public void insertEnroll(EnrollVO vo) {
		sdao.insertEnroll(vo);
		cdao.updatePersons(vo.getLcode(), 1);
	}
	
	@Transactional
	@Override
	public void deleteEnroll(EnrollVO vo) {
		sdao.deleteEnroll(vo);
		cdao.updatePersons(vo.getLcode(), -1);
	}

}
