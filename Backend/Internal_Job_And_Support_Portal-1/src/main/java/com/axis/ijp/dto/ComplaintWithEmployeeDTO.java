package com.axis.ijp.dto;

import java.time.LocalDateTime;

import com.axis.ijp.enums.ComplaintStatus;

public class ComplaintWithEmployeeDTO {
    private int complaintId;
    private String subject;
    private String description;
	private LocalDateTime complaintDate;
    private ComplaintStatus complaintStatus;
    private int employeeId;
    private String fullName;
	private String emailId;
    private String gender;
    private String phoneNo;
    private String address;

    public ComplaintWithEmployeeDTO() {
		super();
	}

	public ComplaintWithEmployeeDTO(int complaintId, String subject,String description, LocalDateTime complaintDate,
			ComplaintStatus complaintStatus, int employeeId, String fullName, String emailId, String gender,
			String phoneNo, String address) {
		super();
		this.complaintId = complaintId;
		this.subject = subject;
		this.description = description;
		this.complaintDate = complaintDate;
		this.complaintStatus = complaintStatus;
		this.employeeId = employeeId;
		this.fullName = fullName;
		this.emailId = emailId;
		this.gender = gender;
		this.phoneNo = phoneNo;
		this.address = address;
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

	public int getEmployeeId() {
		return employeeId;
	}

	public void setEmployeeId(int employeeId) {
		this.employeeId = employeeId;
	}

	public String getFullName() {
		return fullName;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
	}

	public String getEmailId() {
		return emailId;
	}

	public void setEmailId(String emailId) {
		this.emailId = emailId;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public String getPhoneNo() {
		return phoneNo;
	}

	public void setPhoneNo(String phoneNo) {
		this.phoneNo = phoneNo;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}
    
}