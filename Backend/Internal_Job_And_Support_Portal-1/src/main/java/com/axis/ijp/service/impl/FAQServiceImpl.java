package com.axis.ijp.service.impl;

import java.util.ArrayList;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.axis.ijp.entity.FAQ;
import com.axis.ijp.repository.FAQRepository;
import com.axis.ijp.service.FAQService;

@Service
public class FAQServiceImpl implements FAQService {

	private final FAQRepository faqRepository;

	@Autowired
	public FAQServiceImpl(FAQRepository faqRepository) {
		this.faqRepository = faqRepository;
	}

	@Override
	public List<FAQ> getAllFAQs() {
		return faqRepository.findAll();
	}

	@Override
	public List<FAQ> getSuggestedFaq(String[] keywords) {
		List<FAQ> suggestedFaqs = new ArrayList<>();
		for (String keyword : keywords) {
			List<FAQ> faqs = faqRepository.findByKeywordInQuestionIgnoreCase(keyword);
			suggestedFaqs.addAll(faqs);
		}
		return suggestedFaqs;
	}

	@Override
	public FAQ saveFAQ(String question, String answer) {
		FAQ faq = new FAQ();
		faq.setQuestion(question);
		faq.setAnswer(answer);
		return faqRepository.save(faq);
	}

}
