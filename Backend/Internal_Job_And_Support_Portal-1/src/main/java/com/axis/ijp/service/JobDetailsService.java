package com.axis.ijp.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.axis.ijp.entity.JobDetails;

@Service
public interface JobDetailsService {
	
	  JobDetails createJobDetails(JobDetails jobDetails);
	  
	    JobDetails getJobDetailsById(int jobId);
	    
	    List<JobDetails> getAllJobDetails();
	    
	    JobDetails updateJobDetails(int jobId, JobDetails jobDetails);
	    
	    void deleteJobDetails(int jobId);
	    
	    long getApplicationCount();

		long getTotalJobDetailsCount();
}
