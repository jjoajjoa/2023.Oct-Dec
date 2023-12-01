package com.example.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/pro")
public class ProController {
	
	@GetMapping("/list")
	public String list() {
		return "pro/list";
	}
	
	@GetMapping("/insert")
	public String insert() {
		return "pro/insert";
	}
	
	@GetMapping("/read/{pcode}")
	public String read(@PathVariable("pcode") String pcode, Model model) {
		model.addAttribute("pcode", pcode);
		return "pro/read";
	}
}