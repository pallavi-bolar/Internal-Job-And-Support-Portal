package com.axis.ijp.dto;

import java.time.LocalDateTime;

import com.axis.ijp.enums.JobApplicationStatus;

public class JobApplicationResponseDTO {
	
	 private int applicantId;
	 private int applicationId;
	 private int jobId;
	    private LocalDateTime applicationDate;
	    private JobApplicationStatus jobApplicationStatus;
	    public int getApplicationId() {
		return applicationId;
	}
	public void setApplicationId(int applicationId) {
		this.applicationId = applicationId;
	}
		
		public int getApplicantId() {
			return applicantId;
		}
		public void setApplicantId(int applicantId) {
			this.applicantId = applicantId;
		}
		public int getJobId() {
			return jobId;
		}
		public void setJobId(int jobId) {
			this.jobId = jobId;
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
		public JobApplicationResponseDTO(int applicantId, int applicationId, int jobId, LocalDateTime applicationDate,
				JobApplicationStatus jobApplicationStatus) {
			super();
			this.applicantId = applicantId;
			this.applicationId = applicationId;
			this.jobId = jobId;
			this.applicationDate = applicationDate;
			this.jobApplicationStatus = jobApplicationStatus;
		}
		public JobApplicationResponseDTO() {
			super();
		}
	
	    
	    

}
