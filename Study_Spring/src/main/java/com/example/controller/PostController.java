package com.example.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/posts")
public class PostController {
	
	@GetMapping("/list")
	public String list(Model model) {
		model.addAttribute("pageName", "posts/list");
		return "home";
	}

	@GetMapping("/read")
	public String read(Model model, int pid) {
		model.addAttribute("pid", pid);
		model.addAttribute("pageName", "posts/read");
		return "home";
	}
	
	@GetMapping("/insert")
	public String insert(Model model) {
		model.addAttribute("pageName", "posts/insert");
		return "home";
	}
	
	@GetMapping("/update")
	public String update(Model model, int pid) {
		model.addAttribute("pid", pid);
		model.addAttribute("pageName", "posts/update");
		return "home";
	}
}
