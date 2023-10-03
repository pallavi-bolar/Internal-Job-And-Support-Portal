package com.axis.ijp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.axis.ijp.entity.JobDetails;

public interface JobDetailsRepository extends JpaRepository<JobDetails, Integer> {
	@Query("SELECT j.department, COUNT(j) FROM JobDetails j GROUP BY j.department")
	List<Object[]> getDepartmentCount();

	@Query("SELECT COUNT(DISTINCT j.department) FROM JobDetails j")
	long countDistinctDepartments();

}
