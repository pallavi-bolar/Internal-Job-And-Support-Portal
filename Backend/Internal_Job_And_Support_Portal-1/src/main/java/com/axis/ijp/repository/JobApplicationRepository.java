package com.axis.ijp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.axis.ijp.entity.Employee;
import com.axis.ijp.entity.JobApplication;
import com.axis.ijp.enums.JobApplicationStatus;

public interface JobApplicationRepository extends JpaRepository<JobApplication, Integer>{

	List<JobApplication> findByJobApplicationStatus(JobApplicationStatus jobApplicationStatus);
	
	List<JobApplication> findByApplicant(Employee applicant);
	
	List<JobApplication> findByApplicantEmployeeId(int employeeId);
}
