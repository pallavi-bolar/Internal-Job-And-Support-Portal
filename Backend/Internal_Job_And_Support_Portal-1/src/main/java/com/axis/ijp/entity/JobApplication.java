package com.axis.ijp.entity;

import java.time.LocalDateTime;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.OneToMany;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

import com.axis.ijp.enums.JobApplicationStatus;

@Entity
public class JobApplication {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int applicationId;

	@ManyToOne
	@JoinColumn(name = "applicantId")
	private Employee applicant;

	@ManyToOne
	@JoinColumn(name = "jobId")
	private JobDetails job;

	private LocalDateTime applicationDate;

	@OneToMany(mappedBy = "jobApplication")
	private List<UpdatedStatus> updatedStatuses = new ArrayList<>();

	@Enumerated(EnumType.STRING)
	private JobApplicationStatus jobApplicationStatus;

	public JobApplication() {
		super();
	}

	public JobApplication(int applicationId, Employee applicant, JobDetails job, LocalDateTime applicationDate,
			List<UpdatedStatus> updatedStatuses, JobApplicationStatus jobApplicationStatus) {
		super();
		this.applicationId = applicationId;
		this.applicant = applicant;
		this.job = job;
		this.applicationDate = applicationDate;
		this.updatedStatuses = updatedStatuses;
		this.jobApplicationStatus = jobApplicationStatus;
	}

	public int getApplicationId() {
		return applicationId;
	}

	public void setApplicationId(int applicationId) {
		this.applicationId = applicationId;
	}

	public Employee getApplicant() {
		return applicant;
	}

	public void setApplicant(Employee applicant) {
		this.applicant = applicant;
	}

	public JobDetails getJob() {
		return job;
	}

	public void setJob(JobDetails job) {
		this.job = job;
	}

	public LocalDateTime getApplicationDate() {
		return applicationDate;
	}

	public void setApplicationDate(LocalDateTime applicationDate) {
		this.applicationDate = applicationDate;
	}

	public List<UpdatedStatus> getUpdatedStatuses() {
		return updatedStatuses;
	}

	public void setUpdatedStatuses(List<UpdatedStatus> updatedStatuses) {
		this.updatedStatuses = updatedStatuses;
	}

	public JobApplicationStatus getJobApplicationStatus() {
		return jobApplicationStatus;
	}

	public void setJobApplicationStatus(JobApplicationStatus jobApplicationStatus) {
		this.jobApplicationStatus = jobApplicationStatus;
	}
}
