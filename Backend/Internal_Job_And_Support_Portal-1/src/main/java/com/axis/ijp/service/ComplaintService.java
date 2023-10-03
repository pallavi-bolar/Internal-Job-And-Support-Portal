package com.axis.ijp.service;

import com.axis.ijp.dto.ComplaintDTO;

import com.axis.ijp.dto.ComplaintWithEmployeeDTO;
import com.axis.ijp.entity.Complaint;
import com.axis.ijp.entity.FAQ;
import com.axis.ijp.enums.ComplaintStatus;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

@Service
public interface ComplaintService {
	// Complaint Controller
	Complaint submitComplaint(int employeeId, String subject, String description);

	List<Complaint> getComplaintsByEmployee(int employeeId);

	List<Complaint> getComplaintsByEmployeeName(String employeeName);

	List<FAQ> getSuggestedFaqsForComplaint(int complaintId);

	Complaint saveSuggestedFaqToComplaint(int complaintId);

	// Support Assistant Controller
	List<Complaint> getAllComplaints();

	List<ComplaintDTO> getAllComplaintsDto();
	
	long getOpenComplaintsCount();

	List<ComplaintWithEmployeeDTO> getComplaintsWithEmployeeInfo();

	Complaint updateComplaintStatus(int complaintId, ComplaintStatus status);

	Complaint addCommentToComplaint(int complaintId, String comment);

	Complaint updateCommentForComplaint(int complaintId, int commentIndex, String updatedComment);

	List<ComplaintWithEmployeeDTO> getComplaintsWithEmployeeInfoByComplaintId(int complaintId);

	List<Complaint> getAllOpenComplaints();

	Complaint getComplaintById(int complaintId);
	
	Map<String, Long> getComplaintsCountByStatus();

	List<Complaint> getComplaintsByStatus(ComplaintStatus status);
	
}
