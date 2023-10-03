package com.axis.ijp.entity;

import java.time.LocalDateTime;

import com.axis.ijp.enums.JobApplicationStatus;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class UpdatedStatus {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int  id;

	@ManyToOne
	@JoinColumn(name = "application_id")
	private JobApplication jobApplication;

	@ManyToOne
	@JoinColumn(name = "employeeId")
	private Employee applicant;

	@Enumerated(EnumType.STRING)
	private JobApplicationStatus newStatus;

	private LocalDateTime updateTimestamp;

	public UpdatedStatus() {
		super();
	}

	public UpdatedStatus(int id, JobApplication jobApplication, Employee applicant, JobApplicationStatus newStatus,
			LocalDateTime updateTimestamp) {
		super();
		this.id = id;
		this.jobApplication = jobApplication;
		this.applicant = applicant;
		this.newStatus = newStatus;
		this.updateTimestamp = updateTimestamp;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public JobApplication getJobApplication() {
		return jobApplication;
	}

	public void setJobApplication(JobApplication jobApplication) {
		this.jobApplication = jobApplication;
	}

	public Employee getApplicant() {
		return applicant;
	}

	public void setApplicant(Employee applicant) {
		this.applicant = applicant;
	}

	public JobApplicationStatus getNewStatus() {
		return newStatus;
	}

	public void setNewStatus(JobApplicationStatus newStatus) {
		this.newStatus = newStatus;
	}

	public LocalDateTime getUpdateTimestamp() {
		return updateTimestamp;
	}

	public void setUpdateTimestamp(LocalDateTime updateTimestamp) {
		this.updateTimestamp = updateTimestamp;
	}
}


