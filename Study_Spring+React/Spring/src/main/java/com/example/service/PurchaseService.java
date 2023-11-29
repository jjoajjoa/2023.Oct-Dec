package com.example.service;

import org.springframework.stereotype.Service;

import com.example.domain.PurchaseVO;

public interface PurchaseService {
	public void insertPurchase(PurchaseVO vo);
}
