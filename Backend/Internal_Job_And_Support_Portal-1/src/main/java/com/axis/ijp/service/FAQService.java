package com.axis.ijp.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.axis.ijp.entity.FAQ;

@Service
public interface FAQService {
	List<FAQ> getAllFAQs();

	FAQ saveFAQ(String question,String answer);

	List<FAQ> getSuggestedFaq(String[] keywords);
}
