package com.axis.ijp.service.impl;

import java.time.LocalDate;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.axis.ijp.dto.JobApplicationDTO;
import com.axis.ijp.dto.JobApplicationResponseDTO;
import com.axis.ijp.entity.Employee;
import com.axis.ijp.entity.JobApplication;
import com.axis.ijp.entity.JobDetails;
import com.axis.ijp.enums.EmployeeRole;
import com.axis.ijp.enums.JobApplicationStatus;
import com.axis.ijp.repository.EmployeeRepository;
import com.axis.ijp.repository.JobApplicationRepository;
import com.axis.ijp.repository.JobDetailsRepository;
import com.axis.ijp.service.JobApplicationService;

@Service
public class JobApplicationServiceImpl implements JobApplicationService {

	@Autowired
    private EmployeeRepository employeeRepository;
	
    private final JobApplicationRepository jobApplicationRepository;
    private final JobDetailsRepository jobDetailsRepository;
    private final EmployeeServiceImpl employeeService;

    @Autowired
    public JobApplicationServiceImpl(
            JobApplicationRepository jobApplicationRepository,
            JobDetailsRepository jobDetailsRepository,
            EmployeeServiceImpl employeeService) {
        this.jobApplicationRepository = jobApplicationRepository;
        this.jobDetailsRepository = jobDetailsRepository;
        this.employeeService = employeeService;
    }
    
  //employee gets applications that are not past deadline
    @Override
    public ResponseEntity<List<JobDetails>> getAllOpenApplications() {
        List<JobDetails> allApplications = jobDetailsRepository.findAll();
        List<JobDetails> openApplications = new ArrayList<>();

        LocalDate now = LocalDate.now();

        for (JobDetails jobDetails : allApplications) {
            LocalDate applicationDeadline = jobDetails.getApplicationDeadline();
            if (applicationDeadline != null && applicationDeadline.isAfter(now)) {
                JobDetails jd = new JobDetails();
                jd.setJobId(jobDetails.getJobId());
                jd.setJobTitle(jobDetails.getJobTitle());
                jd.setJobDescription(jobDetails.getJobDescription());
                jd.setDepartment(jobDetails.getDepartment());
                jd.setJobLocation(jobDetails.getJobLocation());
                jd.setQualification(jobDetails.getQualification());
                jd.setApplicationDeadline(applicationDeadline);
                openApplications.add(jd);
            }
        }

        return ResponseEntity.ok(openApplications);
    }

    
 // employee-only Candidate- applies for job and sets application job status as
  	// applied
  	@Override
  	public ResponseEntity<String> applyForJob(int jobId, int employeeId) {
  		
  	    Employee applicant = employeeService.getEmployeeById(employeeId);
  	    if (applicant.getRole() == EmployeeRole.CANDIDATE) {
  	        JobDetails job = jobDetailsRepository.findById(jobId).orElse(null);
  	        if (job != null) {
  	            LocalDate now = LocalDate.now();
  	            LocalDate dateOfJoining = applicant.getDateOfJoining();
  	            if (dateOfJoining != null) {
  	                long daysDifference = ChronoUnit.DAYS.between(dateOfJoining, now);

  	                if (daysDifference > 365) {
  	                    JobApplication application = new JobApplication();
  	                    application.setJob(job);
  	                    application.setApplicant(applicant);
  	                    application.setJobApplicationStatus(JobApplicationStatus.APPLIED);
  	                    application.setApplicationDate(LocalDateTime.now());

  	                    jobApplicationRepository.save(application);

  	                    return ResponseEntity.ok().body("Application submitted successfully");
  	                } else {
  	                    return ResponseEntity.badRequest().body("You cannot apply within 1 year of joining.");
  	                }
  	            } else {
  	                return ResponseEntity.badRequest().body("Invalid date of joining.");
  	            }
  	        } else {
  	            return ResponseEntity.badRequest().body("Job does not exist");
  	        }
  	    } else {
  	        return ResponseEntity.badRequest().body("You are not a candidate, you cannot apply");
  	    }
  	}
  	
  	@Override
 	public ResponseEntity<String> getJobApplicationStatus(int jobId,int employeeId){
 		Employee applicant = employeeService.getEmployeeById(employeeId);
		List<JobApplication> applications = jobApplicationRepository.findByApplicant(applicant);
		for (JobApplication application : applications) {
			JobDetails job =application.getJob();
			if(job.getJobId()==jobId) {
			if(application.getJobApplicationStatus()==JobApplicationStatus.APPLIED) {
				return ResponseEntity.ok().body("You have already applied for this job");
			}else if(application.getJobApplicationStatus()==JobApplicationStatus.IN_PROGRESS) {
				return ResponseEntity.ok().body("Your job application is in progress");
			}else if(application.getJobApplicationStatus()==JobApplicationStatus.ACCEPTED) {
				return ResponseEntity.ok().body("Your job application has been accepted");
			}else if(application.getJobApplicationStatus()==JobApplicationStatus.REJECTED) {
				return ResponseEntity.ok().body("Your job application has been rejected,You cannot apply for this job");
			}else if(application.getJobApplicationStatus()==JobApplicationStatus.SELECTED_FOR_INTERVIEW) {
				return ResponseEntity.ok().body("You have been selected for interview");
			}
			}
			
		}
		return ResponseEntity.ok().body("Apply for job");


 	}

 // employee-Candidate- tracks applications they have applied for

 	@Override
 	public ResponseEntity<List<JobApplicationDTO>> getApplicationsByApplicant(int employeeId) {
 		Employee applicant = employeeService.getEmployeeById(employeeId);

 		if (applicant.getRole() == EmployeeRole.CANDIDATE) {
 			List<JobApplication> applications = jobApplicationRepository.findByApplicant(applicant);
 			List<JobApplicationDTO> applicationDTOs = new ArrayList<>();

 			for (JobApplication application : applications) {
 				JobApplicationDTO dto = new JobApplicationDTO();
 				dto.setApplicationId(application.getApplicationId());
 				dto.setApplicationDate(application.getApplicationDate());
 				dto.setEmployeeId(applicant.getEmployeeId());
 				dto.setFullName(applicant.getFullName());
 				dto.setJobId(application.getJob().getJobId());
 				dto.setJobTitle(application.getJob().getJobTitle());
 				dto.setJobDescription(application.getJob().getJobDescription());
 				dto.setDepartment(application.getJob().getDepartment());
 				dto.setLocation(application.getJob().getJobLocation());
 				dto.setApplicationDeadLine(application.getJob().getApplicationDeadline());
 				dto.setJobApplicationStatus(application.getJobApplicationStatus());
 				applicationDTOs.add(dto);
 			}

 			return ResponseEntity.ok(applicationDTOs);
 		} else {
 			return ResponseEntity.notFound().build();
 		}
 	}
 	
 	@Override
    public void updateApplicationStatus(int applicationId, JobApplicationStatus newStatus) {
        JobApplication jobApplication = jobApplicationRepository.findById(applicationId).orElse(null);
        if (jobApplication != null) {
            jobApplication.setJobApplicationStatus(newStatus);
            jobApplicationRepository.save(jobApplication);
        }
    }
 	
 	@Override
    public void updateJobApplicationStatus(int employeeId, int applicationId, JobApplicationStatus newStatus) {
        // Retrieve Employee
        Employee employee = employeeRepository.findById(employeeId).orElse(null);

        if (employee != null) {
            // Find the JobApplication associated with the employee
            JobApplication jobApplication = employee.getJobApplications().stream()
                    .filter(application -> application.getApplicationId() == applicationId)
                    .findFirst().orElse(null);

            if (jobApplication != null) {
                // Update JobApplication Status
                jobApplication.setJobApplicationStatus(newStatus);

                // Save changes
                jobApplicationRepository.save(jobApplication);
            }
        }
    }
 	
 	@Override
	public List<JobApplicationResponseDTO> getAppliedJobDetails(int employeeId) {
		return null;
	}
 	
 	public Map<JobApplicationStatus, Long> getStatusCounts() {
        List<JobApplication> jobApplications = jobApplicationRepository.findAll();
        Map<JobApplicationStatus, Long> statusCounts = new HashMap<>();

        for (JobApplicationStatus status : JobApplicationStatus.values()) {
            long count = jobApplications.stream()
                .filter(application -> application.getJobApplicationStatus() == status)
                .count();
            statusCounts.put(status, count);
        }

        return statusCounts;
    }
 	
}
