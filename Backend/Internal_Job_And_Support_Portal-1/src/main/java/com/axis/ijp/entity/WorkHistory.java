package com.axis.ijp.entity;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class WorkHistory {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int workId;

	@ManyToOne
	@JoinColumn(name = "employeeId")
	private Employee employee;

	private String company;
	private String position;
	private LocalDate startDate;
	private LocalDate endDate;
	
	public WorkHistory() {
		super();
	}
	public WorkHistory(int workId, Employee employee, String company, String position, LocalDate startDate,
			LocalDate endDate) {
		super();
		this.workId = workId;
		this.employee = employee;
		this.company = company;
		this.position = position;
		this.startDate = startDate;
		this.endDate = endDate;
	}
	public int getWorkId() {
		return workId;
	}
	public void setWorkId(int workId) {
		this.workId = workId;
	}
	public Employee getEmployee() {
		return employee;
	}
	public void setEmployee(Employee employee) {
		this.employee = employee;
	}
	public String getCompany() {
		return company;
	}
	public void setCompany(String company) {
		this.company = company;
	}
	public String getPosition() {
		return position;
	}
	public void setPosition(String position) {
		this.position = position;
	}
	public LocalDate getStartDate() {
		return startDate;
	}
	public void setStartDate(LocalDate startDate) {
		this.startDate = startDate;
	}
	public LocalDate getEndDate() {
		return endDate;
	}
	public void setEndDate(LocalDate endDate) {
		this.endDate = endDate;
	}
}