package com.axis.ijp.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.axis.ijp.dto.JobApplicationDTO;
import com.axis.ijp.entity.JobApplication;
import com.axis.ijp.entity.JobDetails;
import com.axis.ijp.enums.JobApplicationStatus;
import com.axis.ijp.repository.JobApplicationRepository;
import com.axis.ijp.service.JobApplicationService;
import com.axis.ijp.service.impl.JobApplicationServiceImpl;

@RestController
@RequestMapping("/api/job-applications")
public class JobApplicationController {
	@Autowired
	private JobApplicationService jobApplicationService;
	private final JobApplicationRepository jobApplicationRepository;
    private final JobApplicationServiceImpl jobApplicationServiceImpl;

    @Autowired
    public JobApplicationController(
            JobApplicationRepository jobApplicationRepository,
            JobApplicationServiceImpl jobApplicationServiceImpl) {
        this.jobApplicationRepository = jobApplicationRepository;
        this.jobApplicationServiceImpl = jobApplicationServiceImpl;
    }
    
    /**
   	 * Update the status of a job application (accessible by HR).
   	 * Author: Utkarsha Bhosale
   	 */
    @PutMapping("/update-status")
	@PreAuthorize("hasAuthority('ROLE_HR')")
    public ResponseEntity<String> updateJobApplicationStatus(
            @RequestParam int employeeId,
            @RequestParam int applicationId,
            @RequestParam JobApplicationStatus newStatus) {

        jobApplicationService.updateJobApplicationStatus(employeeId, applicationId, newStatus);
        return new ResponseEntity<>("Job application status updated successfully", HttpStatus.OK);
    }
    
    /**
	 * Update the status of a job application (accessible by HR).
	 * Author: Krishnapriya
	 */
//	@PostMapping("/{applicationId}/updateStatus")
//	@PreAuthorize("hasAuthority('ROLE_HR')")
//	public ResponseEntity<String> updateStatus(
//			@PathVariable int applicationId,
//			@RequestBody Map<String, String> requestBody) {
//		String newStatusValue = requestBody.get("newStatus");
//
//		try {
//			JobApplicationStatus newStatus = JobApplicationStatus.valueOf(newStatusValue);
//
//			JobApplication jobApplication = jobApplicationRepository.findById(applicationId).orElse(null);
//			if (jobApplication != null) {
//				jobApplication.setJobApplicationStatus(newStatus);
//				jobApplicationRepository.save(jobApplication);
//
//				return ResponseEntity.ok("Status updated successfully");
//			} else {
//				return ResponseEntity.notFound().build();
//			}
//		} catch (IllegalArgumentException e) {
//			return ResponseEntity.badRequest().body("Invalid status value");
//		}
//	}

	/**
	 * Get job application details with status updates (accessible by employees).
	 * Author: Utkarsha Bhosale
	 */
	@GetMapping("/trackApplications/{applicationId}")
	public ResponseEntity<JobApplication> getJobApplicationWithStatusUpdates(@PathVariable int applicationId) {
		JobApplication jobApplication = jobApplicationRepository.findById(applicationId).orElse(null);
		if (jobApplication != null) {
			return ResponseEntity.ok(jobApplication);
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	/**
	 * View open job applications.
	 * Author: Krishnapriya S
	 */
	// get applications which are not expired i.e. which has last date after todays
	// date
	@GetMapping("/view-open-applications")
	@PreAuthorize("hasAuthority('ROLE_CANDIDATE')")
	public ResponseEntity<List<JobDetails>> viewOpenApplications() {
		return jobApplicationService.getAllOpenApplications();
	}

	@GetMapping("/view-job-application-status/{jobId}/{employeeId}")
	@PreAuthorize("hasAuthority('ROLE_CANDIDATE')")
	public ResponseEntity<String> getJobApplicationStatus(@PathVariable int jobId, @PathVariable int employeeId){
		return jobApplicationService.getJobApplicationStatus(jobId, employeeId);
	}
	

	/**
	 * Apply for a job.
	 * Author: Krishnapriya S
	 */
	// check if the jobid is in not expired pool of jobs,check if applicant is
	// serving more than a year,apply for the job
	@PostMapping("/apply-for-job/{jobId}/{employeeId}")
	@PreAuthorize("hasAuthority('ROLE_CANDIDATE')")
	public ResponseEntity<String> applyForJob(@PathVariable int jobId, @PathVariable int employeeId) {

		ResponseEntity<List<JobDetails>> openApplicationsResponse = viewOpenApplications();
		List<JobDetails> openApplications = openApplicationsResponse.getBody();

		for (JobDetails jobDetails : openApplications) {
			if (jobDetails.getJobId() == jobId) {
				ResponseEntity<String> res = jobApplicationService.applyForJob(jobId, employeeId);
				return ResponseEntity.ok(res.getBody());
			}
		}

		return ResponseEntity.badRequest().body("Job with jobId " + jobId + " is not available for application.");
	}

	/**
	 * Track applied job applications of an employee.
	 * Author: Krishnapriya S
	 */
	@GetMapping("/track-applied-applications/{employeeId}")
	//@PreAuthorize("hasAuthority('ROLE_CANDIDATE')")
	public ResponseEntity<List<JobApplicationDTO>> trackJobApplications(@PathVariable int employeeId) {
		return jobApplicationServiceImpl.getApplicationsByApplicant(employeeId);
	}
	
	@GetMapping("/status-count")
    public ResponseEntity<Map<JobApplicationStatus, Long>> getStatusCounts() {
        Map<JobApplicationStatus, Long> statusCounts = jobApplicationService.getStatusCounts();
        return ResponseEntity.ok(statusCounts);
    }

}
