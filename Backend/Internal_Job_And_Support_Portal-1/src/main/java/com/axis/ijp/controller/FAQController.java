package com.axis.ijp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.axis.ijp.dto.FAQDTO;
import com.axis.ijp.entity.FAQ;
import com.axis.ijp.service.impl.FAQServiceImpl;

@RestController
@RequestMapping("/api/faqs")
public class FAQController {

	private final FAQServiceImpl faqServiceImpl;

    @Autowired
    public FAQController(FAQServiceImpl faqServiceImpl) {
        this.faqServiceImpl = faqServiceImpl;
    }

    /**
     * Get all FAQs.
     * Author: Krishnapriya S
     */
    @GetMapping("/all-faqs")
    public ResponseEntity<List<FAQ>> getAllFAQs() {
        List<FAQ> faqs = faqServiceImpl.getAllFAQs();
        return ResponseEntity.ok(faqs);
    }
    
    /**
     * Create a new FAQ.
     * Author: Krishnapriya S
     */
    @PostMapping("/create-faqs")
    @PreAuthorize("hasAuthority('ROLE_CUSTOMER_SUPPORT')")
    public ResponseEntity<FAQ> createFAQ(@RequestBody FAQDTO faq) {
        FAQ savedFAQ = faqServiceImpl.saveFAQ(faq.getQuestion(),faq.getAnswer());
        return ResponseEntity.ok(savedFAQ);
    }
}
