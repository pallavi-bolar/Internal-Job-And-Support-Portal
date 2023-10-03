package com.axis.ijp.controller;

import java.util.Collections;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.axis.ijp.dto.ComplaintDTO;
import com.axis.ijp.entity.Complaint;
import com.axis.ijp.entity.Employee;
import com.axis.ijp.entity.FAQ;
import com.axis.ijp.exception.ComplaintNotFoundException;
import com.axis.ijp.exception.EmployeeNotFoundException;
import com.axis.ijp.service.ComplaintService;
import com.axis.ijp.service.EmployeeService;

@RestController
@RequestMapping("/api/complaints")
@CrossOrigin(origins = "http://localhost:3000")
public class ComplaintController {

	private final ComplaintService complaintService;
	private final EmployeeService employeeService;

    @Autowired
    public ComplaintController(ComplaintService complaintService, EmployeeService employeeService) {
        this.complaintService = complaintService;
        this.employeeService = employeeService;
    }

    /**
     * Submit a new complaint.
     * Author: Krishnapriya S
     */
    @PostMapping("/submit/{employeeId}")
    public ResponseEntity<Complaint> submitComplaints(@PathVariable int employeeId, @RequestBody ComplaintDTO complaint) {
        String subject = complaint.getSubject();
        String description = complaint.getDescription();
        
        if (subject == null || subject.trim().isEmpty() || description == null || description.trim().isEmpty()) {
            return ResponseEntity.badRequest().body(null); 
        }

        try {
            Complaint newComplaint = complaintService.submitComplaint(employeeId, subject, description);
            Complaint submittedComplaint = complaintService.saveSuggestedFaqToComplaint(newComplaint.getComplaintId());
            return ResponseEntity.ok(submittedComplaint);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null); 
        }
    }

    /**
     * Get complaints by employee ID.
     * Author: Pallavi Bolar
     */
    @GetMapping("/employee/{employeeId}")
    public ResponseEntity<List<Complaint>> getComplaintsByEmployee(@PathVariable int employeeId) {
        try {
            List<Complaint> complaints = complaintService.getComplaintsByEmployee(employeeId);
            if (complaints.isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null); // 400 Not Found
            }
            return ResponseEntity.ok(complaints);
        } catch (EmployeeNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null); // 404 Not Found
        } catch (ComplaintNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null); // 400 Bad Request
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    /**
     * Get complaints by employee name.
     * Author: Pallavi Bolar
     */
    @GetMapping("/employeeByName/{employeeName}")
    public ResponseEntity<List<Complaint>> getComplaintsByEmployeeName(@PathVariable String employeeName) {
        try {
            // Check if an employee with the given name exists
            Employee employee = employeeService.getEmployeeByFullName(employeeName);
            if (employee == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null); // 404 Not Found for Employee
            }

            List<Complaint> complaints = complaintService.getComplaintsByEmployeeName(employeeName);
            if (complaints.isEmpty()) {
                return ResponseEntity.status(HttpStatus.OK).body(Collections.emptyList()); // Empty list for no complaints
            }
            return ResponseEntity.ok(complaints);
        } catch (ComplaintNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null); // 400 Bad Request for Complaint not found
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }



    /**
     * Get suggested FAQs for a complaint.
     * Author: Krishnapriya S
     */
    @GetMapping("/suggestedFaqs/{complaintId}")
    public List<FAQ> getSuggestedFaqs(@PathVariable int complaintId) {
        return complaintService.getSuggestedFaqsForComplaint(complaintId);
    }
}
