package com.example.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/stu")
public class StuController {

	@GetMapping("/list")
	public String list() {
		return "stu/list.html";
	}

	@GetMapping("/read/{scode}")
	public String read(@PathVariable("scode") String scode, Model model) {
		model.addAttribute("scode", scode);
		return "stu/read";
	}
}
