package com.axis.ijp.entity;

import java.time.Year;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class EducationDetail {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int educationId;

	@ManyToOne
	@JoinColumn(name = "employeeId")
	private Employee employee;

	private String institution;
	private String degree;
	private String major;
	private Year completionYear;
	
	public EducationDetail() {
		super();
	}
	
	public EducationDetail(int educationId, Employee employee, String institution, String degree, String major,
			Year completionYear) {
		super();
		this.educationId = educationId;
		this.employee = employee;
		this.institution = institution;
		this.degree = degree;
		this.major = major;
		this.completionYear = completionYear;
	}

	public int getEducationId() {
		return educationId;
	}
	public void setEducationId(int educationId) {
		this.educationId = educationId;
	}
	public Employee getEmployee() {
		return employee;
	}
	public void setEmployee(Employee employee) {
		this.employee = employee;
	}
	public String getInstitution() {
		return institution;
	}
	public void setInstitution(String institution) {
		this.institution = institution;
	}
	public String getDegree() {
		return degree;
	}
	public void setDegree(String degree) {
		this.degree = degree;
	}
	public String getMajor() {
		return major;
	}
	public void setMajor(String major) {
		this.major = major;
	}
	public Year getCompletionYear() {
		return completionYear;
	}
	public void setCompletionYear(Year completionYear) {
		this.completionYear = completionYear;
	}
}
