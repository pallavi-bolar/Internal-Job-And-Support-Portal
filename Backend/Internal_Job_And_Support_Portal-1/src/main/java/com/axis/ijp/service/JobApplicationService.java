package com.axis.ijp.service;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.axis.ijp.dto.JobApplicationDTO;
import com.axis.ijp.dto.JobApplicationResponseDTO;
import com.axis.ijp.dto.JobDetailsDTO;
import com.axis.ijp.entity.JobDetails;
import com.axis.ijp.enums.JobApplicationStatus;

@Service
public interface JobApplicationService {

	 ResponseEntity<List<JobDetails>> getAllOpenApplications();

	 ResponseEntity<String> applyForJob(int jobId, int employeeId);

    ResponseEntity<List<JobApplicationDTO>> getApplicationsByApplicant(int employeeId);

	void updateApplicationStatus(int applicationId, JobApplicationStatus newStatus);
	
	void updateJobApplicationStatus(int employeeId, int applicationId, JobApplicationStatus newStatus);
	
	List<JobApplicationResponseDTO> getAppliedJobDetails(int employeeId);
	
	ResponseEntity<String> getJobApplicationStatus(int jobId, int employeeId);

	Map<JobApplicationStatus, Long> getStatusCounts();
	
}
