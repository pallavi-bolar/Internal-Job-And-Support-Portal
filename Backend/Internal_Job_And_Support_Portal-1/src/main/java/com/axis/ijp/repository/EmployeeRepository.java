package com.axis.ijp.repository;

import java.util.List;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.axis.ijp.entity.Employee;
import com.axis.ijp.enums.EmployeeRole;
import com.axis.ijp.enums.JobApplicationStatus;

	public interface EmployeeRepository extends JpaRepository<Employee, Integer> {
		List<Employee> findByJobApplicationStatus(JobApplicationStatus status);
		
		List<Employee> findByFullNameContainingIgnoreCase(String name);
		
		List<Employee> findByRole(EmployeeRole role);
		
		Optional<Employee> findByFullName(String username);
		
		Employee findByEmailId(String emailId);
		
		List<Employee> findByGender(String gender);
	}
