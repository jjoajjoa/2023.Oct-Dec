package com.example.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/cou")
public class CouController {
	@GetMapping("/list")
	public String list(Model model) {
		model.addAttribute("pageName", "cou/list");
		return "home";
	}
	@GetMapping("/read")
	public String read(Model model) {
		model.addAttribute("pageName", "cou/read");
		return "home";
	}
}
