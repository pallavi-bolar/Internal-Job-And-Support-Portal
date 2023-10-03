package com.axis.ijp.controller;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.axis.ijp.dto.ComplaintDTO;
import com.axis.ijp.entity.Complaint;
import com.axis.ijp.enums.ComplaintStatus;
import com.axis.ijp.service.ComplaintService;
import com.axis.ijp.service.EmployeeService;

import java.time.LocalDateTime;
import java.util.ArrayList;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

public class ComplaintControllerTest {

    @InjectMocks
    private ComplaintController complaintController;

    @Mock
    private ComplaintService complaintService;

    @Mock
    private EmployeeService employeeService;

    @BeforeEach
    public void init() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void testSubmitComplaints_ValidComplaint() {
        // Arrange
        int employeeId = 1;
        ComplaintDTO complaintDTO = new ComplaintDTO(employeeId, 1, "Subject", "Description", LocalDateTime.now(), ComplaintStatus.UNDER_REVIEW, new ArrayList<>(), new ArrayList<>());
        Complaint newComplaint = new Complaint();
        when(complaintService.submitComplaint(employeeId, complaintDTO.getSubject(), complaintDTO.getDescription())).thenReturn(newComplaint);
        when(complaintService.saveSuggestedFaqToComplaint(newComplaint.getComplaintId())).thenReturn(newComplaint);

        // Act
        ResponseEntity<Complaint> response = complaintController.submitComplaints(employeeId, complaintDTO);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(newComplaint, response.getBody());
    }
}
