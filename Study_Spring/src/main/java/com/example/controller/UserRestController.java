package com.example.controller;

import java.io.File;
import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.example.dao.UserDAO;
import com.example.domain.UserVO;

@RestController
@RequestMapping("/users")
public class UserRestController {
	@Autowired
	UserDAO dao;
	
	@GetMapping("/read") //localhost:8080/users/read?uid=blue
	public HashMap<String, Object> read(String uid) {
		return dao.read(uid);
	}
	
	@PostMapping("/login")
	public int login(@RequestBody UserVO vo) {
		int result = 0;

		UserVO user = dao.login(vo.getUid());
		if (user != null) {
			if (vo.getUpass().equals(user.getUpass())) { result = 1; } 
			else { result = 2; }
		}
		return result;
	}
	
	@PostMapping("update")
	public void update(@RequestBody UserVO vo) {
		dao.update(vo);
	}
	
	@PostMapping("/upload")
	public void upload(String uid, MultipartHttpServletRequest multi) throws Exception {
		MultipartFile file = multi.getFile("file");
		String filePath = "/upload/photo/";
		String fileName = System.currentTimeMillis() + ".jpg";
		file.transferTo(new File("c:" + filePath + fileName));
		UserVO vo = new UserVO();
		vo.setUid(uid);
		vo.setPhoto(filePath+fileName);
		dao.photo(vo);
	}
	
	@PostMapping("/password")
	public void password(@RequestBody UserVO vo) {
		dao.password(vo);
	}
	
	@PostMapping("/insert")
	public void insert(@RequestBody UserVO vo) {
		dao.insert(vo);
	}
}
