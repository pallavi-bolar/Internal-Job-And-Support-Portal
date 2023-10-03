package com.axis.ijp.repository;

import com.axis.ijp.entity.Complaint;
import com.axis.ijp.enums.ComplaintStatus;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ComplaintRepository extends JpaRepository<Complaint, Integer> {
	@Query("SELECT c FROM Complaint c JOIN FETCH c.complainant")
	List<Complaint> findAllWithEmployee();

	// ComplaintServiceImpl
	long countByComplaintStatus(ComplaintStatus status);
	
	List<Complaint> findByComplainant_EmployeeId(int employeeId);

	List<Complaint> findByComplainant_FullName(String employeeName);
	
	List<Complaint> findByComplaintStatus(ComplaintStatus status);
	 
	Optional<Complaint> findByComplaintId(int complaintId);

	List<Complaint> findByComplaintStatus(String status);
	
}
