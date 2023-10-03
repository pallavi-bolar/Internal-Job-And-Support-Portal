package com.axis.ijp.dto;

import java.time.LocalDateTime;

import java.util.List;

import com.axis.ijp.enums.ComplaintStatus;

public class ComplaintDTO {
	private int employeeId;
	private int complaintId;
	private String subject;
	private String description;
	private LocalDateTime complaintDate;
	private ComplaintStatus complaintStatus;
	private List<String> comments;
	private List<LocalDateTime> commentDates;
	
	public ComplaintDTO() {
		super();
	}
	public ComplaintDTO(int employeeId, int complaintId, String subject, String description,
			LocalDateTime complaintDate, ComplaintStatus complaintStatus, List<String> comments,
			List<LocalDateTime> commentDates) {
		super();
		this.employeeId = employeeId;
		this.complaintId = complaintId;
		this.subject = subject;
		this.description = description;
		this.complaintDate = complaintDate;
		this.complaintStatus = complaintStatus;
		this.comments = comments;
		this.commentDates = commentDates;
	}
	public int getEmployeeId() {
		return employeeId;
	}
	public void setEmployeeId(int employeeId) {
		this.employeeId = employeeId;
	}
	public int getComplaintId() {
		return complaintId;
	}
	public void setComplaintId(int complaintId) {
		this.complaintId = complaintId;
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
	
}
