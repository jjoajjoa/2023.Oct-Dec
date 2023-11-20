package com.example.dao;
import java.util.*;
import com.example.domain.*;

public interface StuDAO {
	public List<HashMap<String, Object>> list(QueryVO vo);
	public int total(QueryVO vo);
	public HashMap<String, Object> read(String scode);
	//특정 학생의 수강신청 목록 -> 학번을 가지고 어떤 강의를 신청했는지 알려주는 함수 enroll
	public List<HashMap<String, Object>> enroll(String scode);
}
