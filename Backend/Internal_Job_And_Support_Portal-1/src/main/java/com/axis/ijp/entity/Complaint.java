package com.axis.ijp.entity;

import java.time.LocalDateTime;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.ManyToMany;

import com.axis.ijp.enums.ComplaintStatus;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class Complaint {
	
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int complaintId;

    @JsonIgnore
    @ManyToOne
    private Employee complainant; // Employee who posts the complaint

    private String subject;
    private String description;
    private LocalDateTime complaintDate;
    private ComplaintStatus complaintStatus;

    @JsonIgnore
    @ManyToOne
    private Employee assignedSupportAssistant;

    private List<String> comments = new ArrayList<>(); // List of comments
    
    @ElementCollection
    private List<LocalDateTime> commentDates = new ArrayList<>(); // List of comment dates
    
    @JsonIgnore
	@ManyToMany
    private List<FAQ> suggestedFaqs;
    
    public Complaint() {
		super();
	}

	public Complaint(int complaintId, Employee complainant, String subject, String description,
			LocalDateTime complaintDate, ComplaintStatus complaintStatus, Employee assignedSupportAssistant,
			List<String> comments, List<LocalDateTime> commentDates, List<FAQ> suggestedFaqs) {
		super();
		this.complaintId = complaintId;
		this.complainant = complainant;
		this.subject = subject;
		this.description = description;
		this.complaintDate = complaintDate;
		this.complaintStatus = complaintStatus;
		this.assignedSupportAssistant = assignedSupportAssistant;
		this.comments = comments;
		this.commentDates = commentDates;
		this.suggestedFaqs = suggestedFaqs;
	}

	public int getComplaintId() {
		return complaintId;
	}

	public void setComplaintId(int complaintId) {
		this.complaintId = complaintId;
	}

	public Employee getComplainant() {
		return complainant;
	}

	public void setComplainant(Employee complainant) {
		this.complainant = complainant;
	}

	public String getSubject() {
		return subject;
	}

	public void setSubject(String subject) {
		this.subject = subject;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public LocalDateTime getComplaintDate() {
		return complaintDate;
	}

	public void setComplaintDate(LocalDateTime complaintDate) {
		this.complaintDate = complaintDate;
	}

	public ComplaintStatus getComplaintStatus() {
		return complaintStatus;
	}

	public void setComplaintStatus(ComplaintStatus complaintStatus) {
		this.complaintStatus = complaintStatus;
	}

	public Employee getAssignedSupportAssistant() {
		return assignedSupportAssistant;
	}

	public void setAssignedSupportAssistant(Employee assignedSupportAssistant) {
		this.assignedSupportAssistant = assignedSupportAssistant;
	}

	public List<String> getComments() {
		return comments;
	}

	public void setComments(List<String> comments) {
		this.comments = comments;
	}

	public List<LocalDateTime> getCommentDates() {
		return commentDates;
	}

	public void setCommentDates(List<LocalDateTime> commentDates) {
		this.commentDates = commentDates;
	}

	public List<FAQ> getSuggestedFaqs() {
		return suggestedFaqs;
	}

	public void setSuggestedFaqs(List<FAQ> suggestedFaqs) {
		this.suggestedFaqs = suggestedFaqs;
	}
	
}
