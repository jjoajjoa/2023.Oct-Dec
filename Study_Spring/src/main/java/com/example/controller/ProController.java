package com.example.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/pro")
public class ProController {
	@GetMapping("/list")
	public String list(Model model) {
		model.addAttribute("pageName", "pro/list");
		return "home";
	}
	
	@GetMapping("/insert")
	public String insert(Model model) {
		model.addAttribute("pageName", "pro/insert.html");
		return "home.html";
	}
	
	@GetMapping("/read")
	public String read(Model model) {
		model.addAttribute("pageName", "pro/read.html");
		return "home.html";
	}
	
	@GetMapping("/update")
	public String update(Model model) {
		model.addAttribute("pageName", "pro/update.html");
		return "home.html";
	}
}
