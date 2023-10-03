package com.axis.ijp.service.impl;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;
import com.axis.ijp.entity.JobDetails;
import com.axis.ijp.repository.JobDetailsRepository;
import com.axis.ijp.service.JobDetailsService;
import java.util.List;

@Service
public class JobDetailsServiceImpl implements JobDetailsService {

	private final JobDetailsRepository jobDetailsRepository;

    @Autowired
    public JobDetailsServiceImpl(JobDetailsRepository jobDetailsRepository) {
        this.jobDetailsRepository = jobDetailsRepository;
    }

    // Create job openings
    @Override
    public JobDetails createJobDetails(JobDetails jobDetails) {
        return jobDetailsRepository.save(jobDetails);
    }

    // Get job postings by Id
    @Override
    public JobDetails getJobDetailsById(int jobId) {
        return jobDetailsRepository.findById(jobId).orElse(null);
    }

    // Get all job postings
    @Override
    public List<JobDetails> getAllJobDetails() {
        return jobDetailsRepository.findAll();
    }

    // Update job posting details
    @Override
    public JobDetails updateJobDetails(int jobId, JobDetails jobDetails) {
        if (jobDetailsRepository.existsById(jobId)) {
            jobDetails.setJobId(jobId);
            return jobDetailsRepository.save(jobDetails);
        }
        return null;
    }

    // Delete job posting
    @Override
    public void deleteJobDetails(int jobId) {
        jobDetailsRepository.deleteById(jobId);
    }
    
    @Override
    public long getApplicationCount() {
        return jobDetailsRepository.count(); // This counts all employees in the table
    }
   
//    public Map<String, Long> getDepartmentCount() {
//        List<Object[]> departmentCountData = jobDetailsRepository.getDepartmentCount();
//        Map<String, Long> departmentCountMap = new HashMap<>();
//
//        for (Object[] result : departmentCountData) {
//            String department = (String) result[0];
//            Long count = (Long) result[1];
//            departmentCountMap.put(department, count);
//        }
//
//        return departmentCountMap;
//    }
    
    public long getTotalJobDetailsCount() {
        return jobDetailsRepository.count();
    }
}
