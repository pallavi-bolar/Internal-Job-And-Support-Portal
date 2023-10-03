package com.axis.ijp.service.impl;

import java.time.LocalDateTime;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.axis.ijp.dto.ComplaintDTO;
import com.axis.ijp.dto.ComplaintWithEmployeeDTO;
import com.axis.ijp.entity.Complaint;
import com.axis.ijp.entity.Employee;
import com.axis.ijp.entity.FAQ;
import com.axis.ijp.enums.ComplaintStatus;
import com.axis.ijp.exception.ComplaintNotFoundException;
import com.axis.ijp.exception.EmployeeNotFoundException;
import com.axis.ijp.repository.ComplaintRepository;
import com.axis.ijp.service.ComplaintService;
import com.axis.ijp.service.EmployeeService;
import com.axis.ijp.service.FAQService;

@Service
public class ComplaintServiceImpl implements ComplaintService {

	private final ComplaintRepository complaintRepository;
    private final EmployeeService employeeService;
    private final FAQService faqService;

    @Autowired
    public ComplaintServiceImpl(
            ComplaintRepository complaintRepository,
            EmployeeService employeeService,
            FAQService faqService) {
        this.complaintRepository = complaintRepository;
        this.employeeService = employeeService;
        this.faqService = faqService;
    }
    
    private static final String EMPLOYEE_NOT_FOUND_MESSAGE = "Employee with ID %d not found";
    private static final String COMPLAINT_NOT_FOUND_MESSAGE = "Complaint with ID %d not found";
	
	private static final Set<String> STOP_WORDS = new HashSet<>(Arrays.asList("the", "is", "and", "in", "to", "of",
			"it", "for", "with", "on", "at", "am", "I", "have", "has", "had", "will", "here", "do", "you", "my"
	// Add more common stop words as needed
	));

	// ComplaintController
	@Override
	public Complaint submitComplaint(int employeeId, String subject, String description) {
		Employee complainant = employeeService.getEmployeeById(employeeId);
		if (complainant == null) {
			throw new EmployeeNotFoundException(String.format(EMPLOYEE_NOT_FOUND_MESSAGE, employeeId));
		}

		Complaint complaint = new Complaint();
		complaint.setComplainant(complainant);
		complaint.setSubject(subject);
		complaint.setDescription(description);
		complaint.setComplaintDate(LocalDateTime.now());
		complaint.setComplaintStatus(ComplaintStatus.OPENED);

		return complaintRepository.save(complaint);
	}

	@Override
    public Complaint getComplaintById(int complaintId) {
        Optional<Complaint> complaintOptional = complaintRepository.findById(complaintId);
        return complaintOptional.orElse(null);
    }
	
	@Override
	public List<Complaint> getComplaintsByEmployee(int employeeId) {
		Employee employee = employeeService.getEmployeeById(employeeId);
		if (employee == null) {
			throw new EmployeeNotFoundException(String.format(EMPLOYEE_NOT_FOUND_MESSAGE, employeeId));
		}

		return complaintRepository.findByComplainant_EmployeeId(employeeId);
	}

	@Override
	public List<Complaint> getComplaintsByEmployeeName(String employeeName) {
		List<Complaint> complaints = complaintRepository.findByComplainant_FullName(employeeName);
		if (complaints.isEmpty()) {
			throw new ComplaintNotFoundException("No complaints found for employee with name " + employeeName);
		}

		return complaints;
	}

	// SupportAssistantController
	
	@Override
	public List<Complaint> getAllComplaints() {
		return complaintRepository.findAll();
	}
	
	@Override
	public List<ComplaintDTO> getAllComplaintsDto() {
		List<Complaint> complaints = complaintRepository.findAllWithEmployee(); 
		return complaints.stream()
				.map(this::convertToDto)
				.toList();
	}

	private ComplaintDTO convertToDto(Complaint complaint) {
		ComplaintDTO dto = new ComplaintDTO();
		dto.setComplaintId(complaint.getComplaintId());
		dto.setEmployeeId(complaint.getComplainant().getEmployeeId());
		dto.setSubject(complaint.getSubject());
		dto.setDescription(complaint.getDescription());
		dto.setComplaintDate(complaint.getComplaintDate());
		dto.setComplaintStatus(complaint.getComplaintStatus());
		dto.setComments(complaint.getComments());
		dto.setCommentDates(complaint.getCommentDates());
		return dto;
	}

	@Override
	public long getOpenComplaintsCount() {
	    return complaintRepository.countByComplaintStatus(ComplaintStatus.OPENED);
	}
	
	@Override
	public Map<String, Long> getComplaintsCountByStatus() {
	    Map<String, Long> counts = new HashMap<>();
	    counts.put("OPENED", complaintRepository.countByComplaintStatus(ComplaintStatus.OPENED));
	    counts.put("UNDER_REVIEW", complaintRepository.countByComplaintStatus(ComplaintStatus.UNDER_REVIEW));
	    counts.put("RESOLVED", complaintRepository.countByComplaintStatus(ComplaintStatus.RESOLVED));
	    counts.put("CLOSED", complaintRepository.countByComplaintStatus(ComplaintStatus.CLOSED));
	    return counts;
	}

	 @Override
	    public List<Complaint> getComplaintsByStatus(ComplaintStatus status) {
	        return complaintRepository.findByComplaintStatus(status);
	    }
	 
	@Override
    public List<Complaint> getAllOpenComplaints() {
        return complaintRepository.findByComplaintStatus(ComplaintStatus.OPENED);
    }
	
	@Override
	public List<ComplaintWithEmployeeDTO> getComplaintsWithEmployeeInfo() {
        List<Complaint> complaints = complaintRepository.findAll();
        List<ComplaintWithEmployeeDTO> complaintsWithInfo = new ArrayList<>();

        for (Complaint complaint : complaints) {
            Employee complainant = complaint.getComplainant();
            ComplaintWithEmployeeDTO dto = new ComplaintWithEmployeeDTO();
            dto.setComplaintId(complaint.getComplaintId());
            dto.setSubject(complaint.getSubject());
            dto.setComplaintDate(complaint.getComplaintDate());
            dto.setComplaintStatus(complaint.getComplaintStatus());
            dto.setEmployeeId(complainant.getEmployeeId());
            dto.setGender(complainant.getGender());
            dto.setPhoneNo(complainant.getPhoneNo());
            dto.setAddress(complainant.getAddress());
            
            complaintsWithInfo.add(dto);
        }

        return complaintsWithInfo;
    }
	
	@Override
	public List<ComplaintWithEmployeeDTO> getComplaintsWithEmployeeInfoByComplaintId(int complaintId) {
	    Optional<Complaint> complaintOptional = complaintRepository.findById(complaintId);

	    if (complaintOptional.isPresent()) {
	        Complaint complaint = complaintOptional.get();
	        Employee complainant = complaint.getComplainant();

	        ComplaintWithEmployeeDTO dto = new ComplaintWithEmployeeDTO();
	        dto.setComplaintId(complaint.getComplaintId());
	        dto.setSubject(complaint.getSubject());
	        dto.setDescription(complaint.getDescription());
	        dto.setComplaintDate(complaint.getComplaintDate());
	        dto.setComplaintStatus(complaint.getComplaintStatus());
	        dto.setEmployeeId(complainant.getEmployeeId());
	        dto.setGender(complainant.getGender());
	        dto.setPhoneNo(complainant.getPhoneNo());
	        dto.setAddress(complainant.getAddress());
	        dto.setFullName(complainant.getFullName());
	        dto.setEmailId(complainant.getEmailId());

	        return Collections.singletonList(dto);
	    }

	    return Collections.emptyList();
	}
	
	@Override
	public Complaint updateComplaintStatus(int complaintId, ComplaintStatus status) {
		Complaint complaint = complaintRepository.findById(complaintId).orElse(null);
		if (complaint != null) {
			complaint.setComplaintStatus(status);
			return complaintRepository.save(complaint);
		} else {
			throw new ComplaintNotFoundException(String.format(COMPLAINT_NOT_FOUND_MESSAGE, complaintId));
		}
	}

	@Override
	public Complaint addCommentToComplaint(int complaintId, String comment) {
		Complaint complaint = complaintRepository.findById(complaintId).orElse(null);
		if (complaint != null) {
			complaint.getComments().add(comment);
			complaint.getCommentDates().add(LocalDateTime.now()); // Add the current date and time
			return complaintRepository.save(complaint);
		}
		return null;
	}

	@Override
	public Complaint updateCommentForComplaint(int complaintId, int commentIndex, String updatedComment) {
		Complaint complaint = complaintRepository.findById(complaintId).orElse(null);
		if (complaint != null && commentIndex >= 0 && commentIndex < complaint.getComments().size()) {
			complaint.getComments().set(commentIndex, updatedComment);
			return complaintRepository.save(complaint);
		}
		return null;
	}

	public static String[] extractKeywords(String complaintText) {
		// Use regex to find all words in the complaint text i.e description of complaint
		Pattern pattern = Pattern.compile("\\b\\w+\\b");
		Matcher matcher = pattern.matcher(complaintText.toLowerCase());

		// Store the keywords in a set to remove duplicates and stop words
		Set<String> keywords = new HashSet<>();
		while (matcher.find()) {
			String word = matcher.group();
			if (!STOP_WORDS.contains(word)) {
				keywords.add(word);
			}
		}

		// Convert the set of keywords to an array
		return keywords.toArray(new String[0]);
	}

	@Override
	public Complaint saveSuggestedFaqToComplaint(int complaintId) {
		Complaint complaint = complaintRepository.findById(complaintId).orElse(null);
		String description = complaint.getDescription();

		// Extract keywords from the complaint description
		String[] keywords = extractKeywords(description);

		// Get suggested FAQs based on keywords
		List<FAQ> suggestedFaqs = faqService.getSuggestedFaq(keywords);

		// Associate suggested FAQs with the complaint, avoiding duplicates
	    Set<FAQ> uniqueSuggestedFaqs = new HashSet<>(suggestedFaqs);
	    complaint.setSuggestedFaqs(new ArrayList<>(uniqueSuggestedFaqs));

	    return complaintRepository.save(complaint);
	}

	@Override
	public List<FAQ> getSuggestedFaqsForComplaint(int complaintId) {
		Complaint complaint = complaintRepository.findById(complaintId).orElse(null);
		if (complaint != null) {
			return complaint.getSuggestedFaqs();
		} else {
			throw new ComplaintNotFoundException(String.format(COMPLAINT_NOT_FOUND_MESSAGE, complaintId));
		}
	}
}
