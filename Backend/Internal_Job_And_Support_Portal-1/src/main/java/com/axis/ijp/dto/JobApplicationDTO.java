package com.axis.ijp.dto;

import java.time.LocalDate;

import java.time.LocalDateTime;

import com.axis.ijp.enums.JobApplicationStatus;

public class JobApplicationDTO {
	
    private int applicationId;
    private LocalDateTime applicationDate;
    private JobApplicationStatus jobApplicationStatus;
    private int employeeId;
    private String fullName;
    private int jobId;
    private String jobTitle;
    private String jobDescription;
    private String department;
    private String location;
    private LocalDate applicationDeadLine;
    
	public JobApplicationDTO() {
		super();
	}
	public JobApplicationDTO(int applicationId, LocalDateTime applicationDate,
			JobApplicationStatus jobApplicationStatus, int employeeId, String fullName, int jobId, String jobTitle,
			String jobDescription, String department, String location, LocalDate applicationDeadLine) {
		super();
		this.applicationId = applicationId;
		this.applicationDate = applicationDate;
		this.jobApplicationStatus = jobApplicationStatus;
		this.employeeId = employeeId;
		this.fullName = fullName;
		this.jobId = jobId;
		this.jobTitle = jobTitle;
		this.jobDescription = jobDescription;
		this.department = department;
		this.location = location;
		this.applicationDeadLine = applicationDeadLine;
	}
	public int getApplicationId() {
		return applicationId;
	}
	public void setApplicationId(int applicationId) {
		this.applicationId = applicationId;
	}
	public LocalDateTime getApplicationDate() {
		return applicationDate;
	}
	public void setApplicationDate(LocalDateTime applicationDate) {
		this.applicationDate = applicationDate;
	}
	public JobApplicationStatus getJobApplicationStatus() {
		return jobApplicationStatus;
	}
	public void setJobApplicationStatus(JobApplicationStatus jobApplicationStatus) {
		this.jobApplicationStatus = jobApplicationStatus;
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
	public int getJobId() {
		return jobId;
	}
	public void setJobId(int jobId) {
		this.jobId = jobId;
	}
	public String getJobTitle() {
		return jobTitle;
	}
	public void setJobTitle(String jobTitle) {
		this.jobTitle = jobTitle;
	}
	public String getJobDescription() {
		return jobDescription;
	}
	public void setJobDescription(String jobDescription) {
		this.jobDescription = jobDescription;
	}
	public String getDepartment() {
		return department;
	}
	public void setDepartment(String department) {
		this.department = department;
	}
	public String getLocation() {
		return location;
	}
	public void setLocation(String location) {
		this.location = location;
	}
	public LocalDate getApplicationDeadLine() {
		return applicationDeadLine;
	}
	public void setApplicationDeadLine(LocalDate applicationDeadLine) {
		this.applicationDeadLine = applicationDeadLine;
	}  
}
